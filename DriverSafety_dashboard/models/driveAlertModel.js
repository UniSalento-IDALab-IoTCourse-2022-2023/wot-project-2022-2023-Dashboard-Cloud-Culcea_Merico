const mongoose = require('mongoose');

// Define the user schema
const driveAlertSchema = new mongoose.Schema({
  timestamp: {
    date:{
      type: String,
      format: "YYYY-MM-DD",
      required: true
    },
    time:{
      type: String,
      format: "HH:mm:ss",
      required: true
    }
  },
  acceleration:{
    value:{
      type: String,
      required: true,
    },
    unitMeasure:{
      type: String,
      required: true,
    }
  },
  vehicleID: {
    type: String,
    required: true
  }
},
{
  collection: 'driveAlerts' // Specify the custom collection name
});

// Create the user model
const DriveAlert = mongoose.model('DriveAlert', driveAlertSchema);

module.exports = DriveAlert;