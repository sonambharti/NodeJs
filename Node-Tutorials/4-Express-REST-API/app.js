require('dotenv').config('.env');
const fs = require('fs');
const express = require('express');
const morgan = require('morgan');

const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');

app = express();
app.use(express.json()); // middleware to make use of json features in the app using express


/**
 * morgan('dev') => GET /api/v1/tours/1 200 9.673 ms - 1068 => {method route statusCode timeTOExecute Process_id}
 * morgan('short') => ::ffff:127.0.0.1 - GET /api/v1/tours/1 HTTP/1.1 200 1068 - 10.391 ms
 * morgan('combined') => ::ffff:127.0.0.1 - - [20/Oct/2024:16:43:22 +0000] "GET /api/v1/tours/1 HTTP/1.1" 200 1068 "-" "PostmanRuntime/7.41.0"
 * morgan('tiny') => GET /api/v1/tours/1 200 1068 - 10.049 ms
 *  morgan('common') => ::ffff:127.0.0.1 - - [20/Oct/2024:16:46:38 +0000] "GET /api/v1/tours/1 HTTP/1.1" 200 1068
*/

if (process.env.NODE_ENV === 'dev') {
    app.use(morgan('dev')); // morgan is a middleware, used to log in different available environments
}
app.use(express.static(`${__dirname}/public`)); // middleware to serve static files from the given path
/**Note: static middleware is used to access only files not folder. */

app.use((req, res, next) => {
    // console.log("In Middleware ⚠️");
    req.requestedAt = new Date().toISOString();
    next();
});

app.use('/api/v1/tours', tourRouter); // creating tour Route middleware
app.use('/api/v1/users', userRouter); // creating user Route middleware

module.exports = app;