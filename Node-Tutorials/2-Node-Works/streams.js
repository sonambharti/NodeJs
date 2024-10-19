const fs = require('fs')
const http = require('http')

const server = http.createServer()

server.on("request", (req, res) => {
    // console.log("url: ", req.url)
    // Solution 1
    // fs.readFile("./test-file.txt", (err, data) => {
    //     if (err) {
    //         console.log(err);
    //     }
    //     console.log(data);
    //     res.end(data);
    // });

    // Solution 2: Streams
    // const readabl = fs.createReadStream("test-file.txt");
    // readabl.on("data", chunk => {
    //   res.write(chunk);
    // //   console.log(chunk)
    // });
    // readabl.on("end", () => {
    //   res.end();
    // });
    // readabl.on("error", err => {
    //   console.log(err);
    //   res.statusCode = 500;
    //   res.end("File not found!");
    // });

    // Solution 3
    const readable = fs.createReadStream("test-file.txt");
    readable.pipe(res);
    readableSource.pipe(writeableDest)

})
server.listen(8000, "127.0.0.1", () => {
    console.log('Server is running on port 8000')
})