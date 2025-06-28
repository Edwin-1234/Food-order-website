const express = require('express');
const app = express();
const router = require('./routes/index');
const connectDB = require('./config/db');

const cookieParser = require('cookie-parser');
require('dotenv').config();
app.use(cookieParser());
// middleware
app.use(express.json());

// base check
app.get('/', (req, res) => {
  res.send('Hello World');
});

// connect DB
connectDB()
  .then(() => console.log("DB connected ✅"))
  .catch(err => console.log(err));

// route prefix
app.use("/api", router);

// server listen
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
