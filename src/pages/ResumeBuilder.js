import React, { useState } from 'react';
import axios from 'axios';

const ResumeBuilder = () => {
  const [file, setFile] = useState(null);
  const [email, setEmail] = useState('');

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file || !email) return;

    const formData = new FormData();
    formData.append('file', file);
    formData.append('email', email);

    try {
      const response = await axios.post('https://kable-career-backend.onrender.com/api/resume-upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('Resume uploaded successfully:', response.data);
      alert('Resume uploaded successfully');
    } catch (error) {
      console.error('Error uploading resume:', error);
      alert('Error uploading resume');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
    <ul>
      <li>Step 1:</li>
      <p>Enter in the email that is in hubspot. If you don't know what your email is please ask.</p>
      <li>Step 2:</li>
      <p>Choose a file make sure that is a pdf or word document.</p>
      <li>Stpe 3:</li>
      <p>Click upload resume button and wait till the alert to pop up at the top of the screen.</p>
    </ul>
      <input type="email" placeholder="Enter email" onChange={handleEmailChange} />
      <input type="file" onChange={handleFileChange} />
      <button type="submit">Upload Resume</button>
    </form>
  );
};

export default ResumeBuilder;
