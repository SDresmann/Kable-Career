const express = require('express');
const axios = require('axios');

const app = express();

let accessToken = 'CJzZ9riUMhIHAAUAQAAAARiFmIYEIIne5xYo76ThATIUN-vPbOHxyR0qVOZN_EQ8mXIvXjI6TAAABEEAAAAAAAAAAAAAAAAAgAAAAAAABAAAACAAAAAAAOABAAAAAAAAAAAAAAAQAgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABBCFPcUzenE5Odasr7X0WpX2ONxxdeBSgNuYTFSAFoAYAA'; // Replace with your new access token

app.get('/api/contacts', async (req, res) => {
  try {
    const response = await axios.get('https://api.hubapi.com/crm/v3/objects/contacts', {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
      }
    });

    res.status(200).json(response.data);
  } catch (error) {
    console.error('Error fetching contacts:', error.response ? error.response.data : error.message);
    res.status(500).json(error.response ? error.response.data : { message: error.message });
  }
});

app.listen(5000, () => {
  console.log('Server is running on port 5000');
});
