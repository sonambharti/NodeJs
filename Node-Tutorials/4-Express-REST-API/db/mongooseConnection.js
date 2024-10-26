const mongoose = require('mongoose');
require('dotenv').config({path: '.env'}); // for multiple env files
// const ATLAS_URI = process.env.Mongo_URL.replace('<DB_username>', process.env.DB_username).replace('<DB_password>', process.env.DB_password)
const ATLAS_URI = process.env.Local_DB;
console.log("DB_URL : ", ATLAS_URI)


const connectDB = async () => {
    try{
        await mongoose.connect(ATLAS_URI);
        console.log("Mongoose connected...")
    }catch (err) {
        console.log("Error connecting to MongoDB: ", err);
    }
};

module.exports = connectDB;