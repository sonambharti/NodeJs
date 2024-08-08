const axios = require('axios');

// Function to wait for a specified timeout
function wait(timeout) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, timeout);
  });
}

// Function to make a request with retry logic and exponential backoff
async function requestWithRetry(url) {
  const MAX_RETRIES = 10; // Maximum number of retries
  for (let i = 0; i <= MAX_RETRIES; i++) {
    try {
      const response = await axios.get(url); // Make the HTTP request
      return response.data; // Return the response data if successful
    } catch (err) {
      const timeout = Math.pow(2, i) * 100; // Calculate exponential backoff timeout
      console.log('Waiting', timeout, 'ms');
      await wait(timeout); // Wait for the calculated timeout
      console.log('Retrying', err.message, i);
    }
  }
  throw new Error('Max retries reached'); // Throw error if max retries are reached
}

// URL to make the request to
const url = 'https://api.github.com/users/octocat';

// Execute the requestWithRetry function
requestWithRetry(url)
  .then(data => {
    console.log('Request successful:', data);
  })
  .catch(err => {
    console.error('Request failed:', err.message);
  });
