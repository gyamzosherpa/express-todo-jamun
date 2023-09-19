const mongoose = require("mongoose");
const dotenv = require("dotenv");

// Load the environment variables from the .env file
dotenv.config();

// Access the environment variables
const { MONGODB_URI } = process.env;

const connectToDatabase = async () => {
  try {
    await mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
};

module.exports = connectToDatabase;
