import React, { useState } from 'react';
import axios from 'axios';

const FolderUpload = () => {
  const [folderName, setFolderName] = useState('');
  const [selectedFiles, setSelectedFiles] = useState([]);

  const handleFolderNameChange = (e) => setFolderName(e.target.value);
  const handleFileChange = (e) => setSelectedFiles(e.target.files);

  const handleUpload = async (e) => {
    e.preventDefault();

    if (!folderName || selectedFiles.length === 0) {
      alert('Please provide a folder name and select files.');
      return;
    }

    const formData = new FormData();
    formData.append('folderName', folderName);

    Array.from(selectedFiles).forEach((file) => {
      formData.append('files', file);
    });

    try {
      const response = await axios.post(
        'http://localhost:5000/api/uploadFoldersandFiles',
        formData,
        {
          headers: { 'Content-Type': 'multipart/form-data' },
        }
      );

      alert('Files uploaded successfully!');
      console.log(response.data);
    } catch (error) {
      console.error('Error uploading files:', error);
      alert('Failed to upload files.');
    }
  };

  return (
    <div>
      <h2>Upload Files</h2>
      <form onSubmit={handleUpload}>
        <div>
          <label>Folder Name:</label>
          <input type="text" value={folderName} onChange={handleFolderNameChange} required />
        </div>
        <div>
          <label>Select Files:</label>
          <input type="file" multiple onChange={handleFileChange} required />
        </div>
        <button type="submit">Upload</button>
      </form>
    </div>
  );
};

export default FolderUpload;
