# Node Js Streams
Node.js streams are objects that enable reading data from a source or writing data to a destination in a continuous fashion. They provide a powerful way to handle data that might not fit into memory all at once by processing it piece by piece, which makes them ideal for working with large files, network requests, or any data that can be processed incrementally.<br/>

## Types of Streams:
1. Readable Streams: Used for reading data.
2. Writable Streams: Used for writing data.
3. Duplex Streams: Can be both readable and writable (e.g., TCP sockets).
4. Transform Streams: Duplex streams that can modify or transform the data as it is written and read (e.g., zlib compression).

<br/>

## Explanation:
### Reading from a file and writing to another file:
1. Creating Streams:
    - `fs.createReadStream('input.txt')` creates a readable stream for reading from input.txt.
    - `fs.createWriteStream('output.txt')` creates a writable stream for writing to output.txt.
2. Piping:
    - `readableStream.pipe(writableStream)` pipes the readable stream into the writable stream. This means data read from input.txt is directly written to output.txt.
3. Events:
    - The `end` event on the readable stream is triggered when there is no more data to be read.
    - The `finish` event on the writable stream is triggered when all the data has been flushed to the underlying system


### Using Transform Stream to compress data:
1. Creating Streams:
    - `fs.createReadStream('input.txt')` creates a readable stream for reading from input.txt.
    - `fs.createWriteStream('input.txt.gz')` creates a writable stream for writing compressed data to input.txt.gz.
2. Transform Stream:
    - `zlib.createGzip()` creates a transform stream that compresses data using Gzip.
3. Piping:
    - `readableStream.pipe(gzip).pipe(writableStream)` pipes the readable stream into the transform stream (for compression) and then into the writable stream.
4. Events:
    - The `finish` event on the writable stream indicates that the compression and writing process is complete.


## Summary:
Node.js streams provide an efficient way to handle data incrementally, making them suitable for applications that require processing large amounts of data or handling data that arrives over time, such as files, network requests, or real-time data processing.