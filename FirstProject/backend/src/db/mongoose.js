const mongoose = require('mongoose');
// require("dotenv").config({path: 'backend-server/config.env'});
// console.log("load env file: ",process.env.ATLAS_URI)
// const ATLAS_URI = process.env.ATLAS_URI
const ATLAS_URI = "mongodb://127.0.0.1:27017/mern-basic"

const connectDB = async () => {
    try{
        const con = await mongoose.connect(ATLAS_URI);
        console.log("Mongoose connected...", con.connection.host)
    }catch (err) {
        console.log("Error connecting to MongoDB: ", err);
    }
};

module.exports = connectDB;