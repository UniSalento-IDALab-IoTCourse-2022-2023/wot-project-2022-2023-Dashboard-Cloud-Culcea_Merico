const mongoose = require('mongoose');

// Define the user schema
const heartAlertSchema = new mongoose.Schema({
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
const HeartAlert = mongoose.model('HeartAlert', heartAlertSchema);

module.exports = HeartAlert;
