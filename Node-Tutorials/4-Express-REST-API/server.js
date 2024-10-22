// require('dotenv').config('.env');
require('dotenv').config({path: '.env'}); // for multiple env files
const app = require('./app')

// console.log(process.env);


// accessing environment variable from .env
const port = process.env.PORT || 3000;
// const port = 8000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}...`);
})