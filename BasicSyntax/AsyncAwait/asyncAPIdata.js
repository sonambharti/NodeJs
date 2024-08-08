const axios = require('axios');

async function fetchData(url) {
  try {
    const response = await axios.get(url);
    console.log('Data fetched successfully:', response.data);
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}

// Call the async function
fetchData('https://api.github.com/users/octocat');
