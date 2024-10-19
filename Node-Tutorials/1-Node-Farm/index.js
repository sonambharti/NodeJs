const fs = require('fs')
const http = require('http')
const url = require('url')
const replaceModule = require('./module/replaceTemplateModule')

const cardData = fs.readFileSync('templates/template-card.html', 'utf-8');
// console.log(typeof cardData)
const homePage = fs.readFileSync('templates/template-overview.html', 'utf-8');
const productPage = fs.readFileSync('templates/template-product.html', 'utf-8');

const jsonData = fs.readFileSync('data/data.json', 'utf-8');

const parsedData = JSON.parse(jsonData);

const server = http.createServer((req, res) => {
    const {pathName, query} = url.parse(req.url, true);
    if (req.url === '/') {
        res.writeHead(200, {'Content-Type': 'text/html'});
        const Cards = parsedData.map((el) => {
            const cardHTML = replaceModule(cardData, el);
            return cardHTML;
        })
        const home = homePage.replace(/{%PRODUCT_CARDS%}/g, Cards);
        res.end(home);
    }
    else if (req.url === '/product') {
        res.writeHead(200, {'Content-Type': 'text/html'});
        const product = parsedData[query.id]
        const productHTML = replaceModule(productPage, product);
        res.end(productHTML);
    }
    else if (req.url === '/api') {
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.end(parsedData);
    }
    else{
        res.writeHead(404, {'Content-Type': 'text/html'});
        res.end("Page not found...")
    }
});
server.listen(8000, () => {
    console.log('Server running on port 8000')
})
