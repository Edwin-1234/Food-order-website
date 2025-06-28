const mongoose = require('mongoose');
require('dotenv').config();

async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("✅ MongoDB Connected");
  } catch (error) {
    console.error("❌ DB connection error:", error);
    process.exit(1); // exit if DB fails
  }
}

module.exports = connectDB;
