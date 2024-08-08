const fs = require('fs').promises;

async function copyFile(source, destination) {
  try {
    // Read the content of the source file
    const data = await fs.readFile(source, 'utf8');
    console.log('File read successfully');

    // Write the content to the destination file
    await fs.writeFile(destination, data);
    console.log('File written successfully');
  } catch (error) {
    console.error('Error during file operations:', error);
  }
}

// Call the async function
copyFile('input.txt', 'output.txt');
