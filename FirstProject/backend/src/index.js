const express = require('express');
const connectDB = require("./db/mongoose");
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;


// Middleware
app.use(cors());
app.use(express.json());

connectDB();



// Routes
const usersRoute = require('./routes/users');
app.use('/users', usersRoute);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

