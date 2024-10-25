// require('dotenv').config('.env');
require('dotenv').config({path: '.env'}); // for multiple env files
const app = require('./app')
const connectDB = require('./db/mongoose');
const schema = require('./model/tour_model');
// const mongoose = require('mongoose');
// const DB_URL = process.env.Mongo_URL.replace('<DB_username>', process.env.DB_username).replace('<DB_password>', process.env.DB_password)
// console.log("DB_URL : ", DB_URL)
// console.log(process.env);

connectDB();

const newTour = new schema({
    tour_id: 1,
    name: "Darjeling",
    NoOfDays: "3 days",
    Price: 4000,
    DifficultyLevel: "hard level"
});

newTour.save().then((doc) => {
    console.log(doc);
}).catch(err => {
    console.log(err);
});

// accessing environment variable from .env
const port = process.env.PORT || 3000;
// const port = 8000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}...`);
})