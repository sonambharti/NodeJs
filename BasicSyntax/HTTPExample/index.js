const fs = require('fs')
const http = require('http')


const file = fs.readFileSync('page.html')
// const file = fs.readFile('page.html')

const server = http.createServer((req, res) => {
    const path = req.url
    if (path === '/') {
        res.writeHead(200, {'Content-Type': 'text/html'})
        res.end(file)
    }
    else{
        res.writeHead(404, {'Content-Type': 'text/html'})
        res.end('404 Not Found')
    }
    console.log(req)
})
server.listen(3000, () => {
    console.log('Server running on port 3000')
})