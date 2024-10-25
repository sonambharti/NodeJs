require('dotenv').config({path: './env'});
const mongoose = require('mongoose');
const fs = require('fs')
const Tour = require('./../model/tour_model');
const connectDB = require('./../db/mongoose');
// const ATLAS_URI = process.env.Local_DB;

connectDB();

  // READ JSON FILE
  const tours = JSON.parse(
    fs.readFileSync(`${__dirname}/data/tours-simple.json`, 'utf-8')
  );
  
  // IMPORT DATA INTO DB
  const importData = async () => {
    try {
      await Tour.create(tours);
      console.log('Data successfully loaded!');
    } catch (err) {
      console.log(err);
    }
    process.exit();
  };
  
  // DELETE ALL DATA FROM DB
  const deleteData = async () => {
    try {
      await Tour.deleteMany();
      console.log('Data successfully deleted!');
    } catch (err) {
      console.log(err);
    }
    process.exit();
  };
  
  console.log(process.argv);
  if (process.argv[2] === '--import') {
    importData();
  } else if (process.argv[2] === '--delete') {
    deleteData();
  }