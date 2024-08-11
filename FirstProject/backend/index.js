const express = require("express");
const connectDB = require("./db");
const cors = require("cors");

const PORT = process.env.PORT || 5000;

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

connectDB();

// Routes
const usersRoute = require("./routes/users");
app.use("/users", usersRoute);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
