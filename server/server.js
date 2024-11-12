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

// Import the Token model
const Token = require('./models/token.models');

const app = express();

// Load environment variables
const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const REDIRECT_URI = process.env.REDIRECT_URI || 'http://localhost:5000/auth/callback';
const AUTHORIZATION_URL = 'https://app.hubspot.com/oauth/authorize';
const TOKEN_URL = 'https://api.hubapi.com/oauth/v1/token';
const SCOPES = 'files crm.objects.contacts.read crm.objects.contacts.write';

app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB
const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useUnifiedTopology: true, useNewUrlParser: true });
const connection = mongoose.connection;

connection.once('open', () => {
  console.log("MongoDB is connected");
});

// Step 1: Redirect to HubSpot's OAuth 2.0 server
app.get('/auth', (req, res) => {
  const authorizationUri = `${AUTHORIZATION_URL}?${querystring.stringify({
    client_id: CLIENT_ID,
    redirect_uri: REDIRECT_URI,
    scope: SCOPES,
    response_type: 'code',
  })}`;
  res.redirect(authorizationUri);
});

// Step 2: Handle the OAuth 2.0 server response and store tokens
app.get('/auth/callback', async (req, res) => {
  const { code } = req.query;

  if (!code) {
    console.log('No authorization code provided');
    return res.status(400).send('No authorization code provided');
  }

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

    const accessToken = response.data.access_token;
    const refreshToken = response.data.refresh_token;
    const expiresAt = Date.now() + response.data.expires_in * 1000;

    console.log('Access token:', accessToken);
    console.log('Refresh token:', refreshToken);

    // Attempt to save the token to MongoDB
    try {
      const newToken = new Token({ accessToken, refreshToken, expiresAt });
      await newToken.save(); // Important: use await
      console.log('Tokens saved to MongoDB successfully');
      res.send('Authentication successful. You can close this window.');
    } catch (saveError) {
      console.error('Error saving tokens to MongoDB:', saveError);
      res.status(500).send('Error saving tokens to MongoDB');
    }
  } catch (error) {
    console.error('Error during OAuth token exchange:', error.response ? error.response.data : error.message);
    res.status(500).send('Authentication failed');
  }
});

// Step 3: Middleware to refresh tokens if expired
async function getValidAccessToken() {
  let token = await Token.findOne(); // Get the stored token
  if (!token) {
    throw new Error('No tokens found in the database');
  }

  // Check if token is expired
  if (Date.now() > token.expiresAt) {
    console.log('Access token expired, refreshing...');

    // Refresh the token
    try {
      const response = await axios.post(TOKEN_URL, querystring.stringify({
        grant_type: 'refresh_token',
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET,
        refresh_token: token.refreshToken,
      }), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      });

      // Update tokens in MongoDB
      token.accessToken = response.data.access_token;
      token.refreshToken = response.data.refresh_token || token.refreshToken; // Use old refresh token if not returned
      token.expiresAt = Date.now() + response.data.expires_in * 1000;

      await token.save();
      return token.accessToken;
    } catch (error) {
      console.error('Error refreshing access token:', error.response ? error.response.data : error.message);
      throw new Error('Failed to refresh access token');
    }
  }

  return token.accessToken; // Return valid access token
}

// Step 4: File upload handling (with token validation)
const upload = multer({ dest: 'uploads/' });

// Function to get a contact ID by email from HubSpot
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
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      }
    );

    if (response.data.results.length === 0) {
      throw new Error(`Contact not found for email: ${email}`);
    }

    return response.data.results[0].id;
  } catch (error) {
    console.error('Error fetching contact ID:', error.response ? error.response.data : error.message);
    throw error;
  }
}

// Function to update a contact with the file URL in HubSpot
async function updateContactWithFileUrl(contactId, fileUrl, accessToken) {
  try {
    const response = await axios.patch(
      `https://api.hubapi.com/crm/v3/objects/contacts/${contactId}`,
      {
        properties: {
          resume: fileUrl // Assuming 'resume' is the property name in HubSpot to store the file URL
        }
      },
      {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json'
        }
      }
    );

    return response.data;
  } catch (error) {
    console.error('Error updating contact with file URL:', error.response ? error.response.data : error.message);
    throw error;
  }
}

// Resume upload route
app.post('/api/resume-upload', upload.single('file'), async (req, res) => {
  const { email } = req.body;
  const file = req.file;

  if (!email || !file) {
    return res.status(400).send('Email and resume file are required.');
  }

  try {
    const accessToken = await getValidAccessToken(); // Ensure a valid token is available before the upload

    const contactId = await getContactIdByEmail(email, accessToken); // Get the contact ID using the access token
    console.log(`Contact ID for email ${email}: ${contactId}`);

    // Prepare the form data for the file upload
    const fileFormData = new FormData();
    fileFormData.append('file', fs.createReadStream(file.path));
    fileFormData.append('folderPath', 'documents/resumes');
    fileFormData.append('options', JSON.stringify({ access: 'PUBLIC_INDEXABLE' }));

    // Upload the resume file to HubSpot
    const fileUploadResponse = await axios.post(
      'https://api.hubapi.com/files/v3/files',
      fileFormData,
      {
        headers: {
          'Authorization': `Bearer ${accessToken}`, // Pass the valid access token
          ...fileFormData.getHeaders(),
        },
      }
    );

    console.log('File uploaded successfully:', fileUploadResponse.data);

    const fileUrl = fileUploadResponse.data.url;

    // Update the contact with the file URL
    const updateResponse = await updateContactWithFileUrl(contactId, fileUrl, accessToken);
    console.log('Contact updated successfully:', updateResponse);

    fs.unlinkSync(file.path); // Remove the file after upload

    res.status(200).json(updateResponse);
  } catch (error) {
    console.error('Error uploading resume to HubSpot:', error.response ? error.response.data : error.message);
    res.status(500).send('Error uploading resume to HubSpot.');
  }
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
