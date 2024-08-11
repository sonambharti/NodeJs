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


// MongoDB Connection
mongoose.connect('mongodb://localhost:27017/mern-basic', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

mongoose.connection.once('open', () => {
  console.log('Connected to MongoDB');
}).on('error', (error) => {
  console.log('MongoDB connection error: ', error);
});

// Routes
const usersRoute = require('./routes/users');
app.use('/users', usersRoute);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
