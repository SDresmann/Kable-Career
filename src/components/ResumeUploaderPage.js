import React from 'react';
import ResumeUpload from '../pages/ResumeBuilder';

const ResumeUploadPage = () => {
  // Replace with the actual contact ID or make it dynamic if needed
  const contactId = '46752853';

  return (
    <div className='my-5'>
      <h1 className='my-5'>Resume Upload</h1>
      <ResumeUpload contactId={contactId} />
    </div>
  );
};

export default ResumeUploadPage;
