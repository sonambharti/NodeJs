const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(bodyParser.json());
app.use(cors());


const connectDB = require("./db/mongoose");

connectDB();

// Routes
const usersRoute = require('./routes/users');
app.use('/users', usersRoute);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
