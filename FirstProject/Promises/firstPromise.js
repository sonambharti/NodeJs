const fs = require('fs').promises;

// Function that returns a promise
function readFilePromise(filePath) {
  return fs.readFile(filePath, 'utf8');
}

// Using the promise
readFilePromise('Readme.md')
  .then((data) => {
    console.log('File content:', data);
  })
  .catch((error) => {
    console.error('Error reading file:', error);
  })
  .finally(() => {
    console.log('Read file operation completed.');
  });
