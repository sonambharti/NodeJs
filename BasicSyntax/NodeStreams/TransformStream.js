const fs = require('fs');
const zlib = require('zlib');

// Create a readable stream
const readableStream = fs.createReadStream('input.txt');

// Create a writable stream
const writableStream = fs.createWriteStream('input.txt.gz');

// Create a transform stream for compression
const gzip = zlib.createGzip();

// Pipe the streams: readable -> transform -> writable
readableStream.pipe(gzip).pipe(writableStream);

writableStream.on('finish', () => {
  console.log('File has been compressed and written to input.txt.gz.');
});
