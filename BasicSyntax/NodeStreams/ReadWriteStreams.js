const fs = require('fs');

// Create a readable stream
const readableStream = fs.createReadStream('input.txt');

// Create a writable stream
const writableStream = fs.createWriteStream('output.txt');

// Pipe the readable stream to the writable stream
readableStream.pipe(writableStream);

readableStream.on('end', () => {
  console.log('Reading and writing completed.');
});

writableStream.on('finish', () => {
  console.log('All data has been written to output.txt.');
});
