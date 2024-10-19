const EventEmitter = require('events');
const http = require('http');

class Sales extends EventEmitter{
    constructor(){
        super();
    }
}

const myEmitter = new Sales();

myEmitter.on('sale', () => {
    console.log('Sale is live now!!!');
})

myEmitter.on('sale', (sale) => {
    console.log(`Sale for ${sale}%.`);
})

myEmitter.emit('sale', 9);


/** ------------------------------------------------------------------------- */


const server = http.createServer();
server.on('request', (req, res) => {
    console.log('Request received on ', req.url);
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end('Hello World\n');
});


server.on("request", (req, res) => {
    console.log("Another request 😀");
});
  

server.on("close", () => {
console.log("Server closed");
});


server.listen(8000, "127.0.0.1", () => {
    console.log('Server running on port 8000');

})