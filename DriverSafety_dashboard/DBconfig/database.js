// database.js

const mongoose = require('mongoose');

// MongoDB connection string
const mongoURI = 'mongodb://mongodb:27017/safetyDriverDB';

const connectToDatabase = async () => {
  try {
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }
};

module.exports = connectToDatabase;
