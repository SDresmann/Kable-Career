const express = require('express');
const axios = require('axios');
const querystring = require('querystring');
const bodyParser = require('body-parser');
const cors = require('cors');
const multer = require('multer');
const FormData = require('form-data');
const fs = require('fs');
const mongoose = require('mongoose');
require('dotenv').config();

const Token = require('./models/token.models');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Environment Variables
const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const REDIRECT_URI = process.env.REDIRECT_URI || 'http://localhost:5000/auth/callback';
const TOKEN_URL = 'https://api.hubapi.com/oauth/v1/token';
const AUTHORIZATION_URL = 'https://app.hubspot.com/oauth/authorize';
const SCOPES = 'files crm.objects.contacts.read crm.objects.contacts.write';

// MongoDB Connection
const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useUnifiedTopology: true, useNewUrlParser: true });
mongoose.connection.once('open', () => {
  console.log('MongoDB is connected');
});

// OAuth 2.0 Redirect
app.get('/auth', (req, res) => {
  const authorizationUri = `${AUTHORIZATION_URL}?${querystring.stringify({
    client_id: CLIENT_ID,
    redirect_uri: REDIRECT_URI,
    scope: SCOPES,
    response_type: 'code',
  })}`;
  res.redirect(authorizationUri);
});

// Handle OAuth Callback
app.get('/auth/callback', async (req, res) => {
  const { code } = req.query;
  if (!code) return res.status(400).send('No authorization code provided');

  try {
    const response = await axios.post(TOKEN_URL, querystring.stringify({
      grant_type: 'authorization_code',
      client_id: CLIENT_ID,
      client_secret: CLIENT_SECRET,
      redirect_uri: REDIRECT_URI,
      code,
    }), {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    });

    const { access_token, refresh_token, expires_in } = response.data;
    const expiresAt = Date.now() + expires_in * 1000;

    await Token.findOneAndUpdate({}, {
      accessToken: access_token,
      refreshToken: refresh_token,
      expiresAt,
    }, { upsert: true });

    res.send('Authentication successful. You can close this window.');
  } catch (error) {
    console.error('OAuth callback error:', error.response?.data || error.message);
    res.status(500).send('Authentication failed');
  }
});

// Middleware for Token Management
async function getValidAccessToken() {
  const token = await Token.findOne();
  if (!token) throw new Error('No tokens found in the database');

  if (Date.now() > token.expiresAt) {
    try {
      const response = await axios.post(TOKEN_URL, querystring.stringify({
        grant_type: 'refresh_token',
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET,
        refresh_token: token.refreshToken,
      }), {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      });

      token.accessToken = response.data.access_token;
      token.refreshToken = response.data.refresh_token || token.refreshToken;
      token.expiresAt = Date.now() + response.data.expires_in * 1000;

      await token.save();
    } catch (error) {
      console.error('Token refresh error:', error.response?.data || error.message);
      throw new Error('Failed to refresh access token');
    }
  }

  return token.accessToken;
}

// Multer Configuration
const upload = multer({ dest: 'uploads/' });

// Create Folder in HubSpot if Not Exists
async function createFolderIfNotExists(folderName, accessToken) {
  try {
    // Attempt to create the folder directly
    const createResponse = await axios.post(
      'https://api.hubapi.com/files/v3/folders',
      { name: folderName },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      }
    );

    console.log(`Folder "${folderName}" created with ID: ${createResponse.data.id}`);
    return createResponse.data.id;
  } catch (error) {
    const errorMessage = error.response?.data?.message || error.message;
    console.error('Error creating folder:', errorMessage);

    // If the error is "Folder already exists", extract the folder ID from the response
    if (errorMessage.includes('Folder already exists')) {
      const existingFolderId = error.response?.data?.context?.folderId;
      console.log(`Folder "${folderName}" already exists with ID: ${existingFolderId}`);
      return existingFolderId;
    }

    throw error;
  }
}


// File Upload Route
app.post('/api/uploadFoldersandFiles', upload.array('files'), async (req, res) => {
  const { folderName } = req.body;
  const files = req.files;

  // Check for missing folder name or files
  if (!folderName || files.length === 0) {
    console.log('Missing folder name or files.');
    return res.status(400).send('Folder name and files are required.');
  }

  try {
    // Get a valid access token
    const accessToken = await getValidAccessToken();
    console.log('Access token obtained:', accessToken);

    // Get or create the folder ID
    const folderId = await createFolderIfNotExists(folderName, accessToken);
    console.log(`Folder ID: ${folderId}`);

    // Map through each file and upload to HubSpot
    const uploadPromises = files.map(async (file) => {
      console.log(`Uploading file: ${file.originalname}`);

      // Explicitly set the MIME type to video/mp4 for all uploads
      const mimeType = 'video/mp4';
      console.log(`Detected MIME type from Multer: ${file.mimetype}`);

      const formData = new FormData();
      formData.append('file', fs.createReadStream(file.path), {
        filename: file.originalname,
        contentType: mimeType,
      });
      formData.append('folderId', folderId);
      formData.append('options', JSON.stringify({ access: 'PUBLIC_INDEXABLE' }));

      try {
        // Make the API request to upload the file
        const uploadResponse = await axios.post(
          'https://api.hubapi.com/files/v3/files',
          formData,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
              'Content-Type': mimeType, // Set the Content-Type explicitly
              ...formData.getHeaders(),
            },
            timeout: 300000, // 5-minute timeout for large video files
          }
        );

        console.log(`File uploaded successfully: ${uploadResponse.data.url}`);
        // Delete the local file after successful upload
        fs.unlinkSync(file.path);
        return uploadResponse.data;
      } catch (uploadError) {
        console.error('Error during file upload to HubSpot:', uploadError.response?.data || uploadError.message);
        throw uploadError;
      }
    });

    // Wait for all file uploads to complete
    const uploadedFiles = await Promise.all(uploadPromises);
    res.status(200).json({ message: 'Files uploaded successfully', uploadedFiles });
  } catch (error) {
    console.error('General error during file upload:', error);
    res.status(500).send('Error uploading files to HubSpot.');
  }
});

// Resume Upload Route
// Multer Configuration for Resumes
const resumeUpload = multer({
  dest: 'uploads/',
  limits: { fileSize: 10 * 1024 * 1024 }, // Limit file size to 10MB
  fileFilter: (req, file, cb) => {
    const allowedMimeTypes = [
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    ];
    if (allowedMimeTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type. Only PDF and Word documents are allowed.'));
    }
  },
});

// Resume Upload Route
app.post('/api/resume-upload', resumeUpload.single('file'), async (req, res) => {
  const { email } = req.body;
  const file = req.file;

  if (!email || !file) {
    return res.status(400).send('Email and resume file are required.');
  }

  try {
    // Get a valid access token
    const accessToken = await getValidAccessToken();
    console.log('Access token obtained:', accessToken);

    // Get contact ID from email
    const contactId = await getContactIdByEmail(email, accessToken);
    console.log(`Contact ID for email ${email}: ${contactId}`);

    // Determine the MIME type and ensure correct extension
    const mimeType = file.mimetype;
    console.log(`Detected MIME type: ${mimeType}`);

    const fileExtension =
      mimeType === 'application/pdf' ? '.pdf' :
      mimeType === 'application/msword' ? '.doc' :
      mimeType === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' ? '.docx' :
      '';
    if (!fileExtension) {
      throw new Error('Invalid file type.');
    }

    // Ensure the file has the correct extension
    const filePath = `${file.path}${fileExtension}`;
    fs.renameSync(file.path, filePath);

    // Prepare the form data for the file upload
    const formData = new FormData();
    formData.append('file', fs.createReadStream(filePath), {
      filename: file.originalname,
      contentType: mimeType,
    });
    formData.append('folderPath', 'documents/resumes');
    formData.append('options', JSON.stringify({ access: 'PUBLIC_INDEXABLE' }));

    // Upload the resume file to HubSpot
    const fileUploadResponse = await axios.post(
      'https://api.hubapi.com/files/v3/files',
      formData,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          ...formData.getHeaders(),
        },
      }
    );

    console.log('File uploaded successfully:', fileUploadResponse.data);

    const fileUrl = fileUploadResponse.data.url;

    // Update the contact with the file URL
    const updateResponse = await updateContactWithFileUrl(contactId, fileUrl, accessToken);
    console.log('Contact updated successfully:', updateResponse);

    fs.unlinkSync(filePath); // Remove the file after upload

    res.status(200).json(updateResponse);
  } catch (error) {
    console.error('Error uploading resume to HubSpot:', error.response?.data || error.message);
    res.status(500).send('Error uploading resume to HubSpot.');
  }
});


// Helper: Update Contact with File URL
async function updateContactWithFileUrl(contactId, fileUrl, accessToken) {
  try {
    const response = await axios.patch(
      `https://api.hubapi.com/crm/v3/objects/contacts/${contactId}`,
      {
        properties: {
          resume: fileUrl, // Assuming 'resume' is the custom property in HubSpot
        },
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error('Error updating contact with file URL:', error.response?.data || error.message);
    throw error;
  }
}


// Helper: Get Contact ID by Email
async function getContactIdByEmail(email, accessToken) {
  try {
    const response = await axios.post(
      'https://api.hubapi.com/crm/v3/objects/contacts/search',
      {
        filterGroups: [
          {
            filters: [
              {
                propertyName: 'email',
                operator: 'EQ',
                value: email,
              },
            ],
          },
        ],
        properties: ['email'],
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      }
    );

    if (response.data.results.length === 0) {
      throw new Error(`Contact not found for email: ${email}`);
    }

    return response.data.results[0].id;
  } catch (error) {
    console.error('Error fetching contact ID:', error.response?.data || error.message);
    throw error;
  }
}

// Helper: Update Contact with File URL
async function updateContactWithFileUrl(contactId, fileUrl, accessToken) {
  try {
    const response = await axios.patch(
      `https://api.hubapi.com/crm/v3/objects/contacts/${contactId}`,
      {
        properties: {
          resume: fileUrl, // Assuming 'resume' is the custom property in HubSpot
        },
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error('Error updating contact with file URL:', error.response?.data || error.message);
    throw error;
  }
}


// Start the Server
const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
