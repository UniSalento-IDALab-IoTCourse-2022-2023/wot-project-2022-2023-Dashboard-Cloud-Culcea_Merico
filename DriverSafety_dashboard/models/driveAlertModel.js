const mongoose = require('mongoose');

// Define the user schema
const driveAlertSchema = new mongoose.Schema({
  timestamp: {
    type: String,
    required: true
  },
  value: {
    type: String,
    required: true,
    unique: true
  },
  vehicleID: {
    type: String,
    required: true
  }
});

// Create the user model
const DriveAlert = mongoose.model('DriveAlert', driveAlertSchema);

module.exports = DriveAlert;