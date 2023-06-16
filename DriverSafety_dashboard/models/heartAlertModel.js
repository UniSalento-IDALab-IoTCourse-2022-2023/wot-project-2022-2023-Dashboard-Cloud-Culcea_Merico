const mongoose = require('mongoose');

// Define the user schema
const heartAlertSchema = new mongoose.Schema({
  timestamp: {
    date:{
      type: String,
      format: 'YYYY-MM-DD',
      required: true
    },
    time:{
      type: String,
      format: 'HH:mm:ss',
      required: true
    }
  },
  value: {
    type: String,
    required: true
  },
  vehicleID: {
    type: String,
    required: true
  }  
},
{
  collection: 'heartAlerts' // Specify the custom collection name
}
);

// Create the user model
const HeartAlert = mongoose.model('HeartAlert', heartAlertSchema);

module.exports = HeartAlert;
