// Import the data model
const heartAlertModel = require('../models/heartAlertModel.js');
const driveAlertModel = require('../models/driveAlertModel.js');

// Create Data
exports.testPost = (req, res) => {
  // Access the JSON data from the request body
  const jsonData = req.body;
  dataModel.addData(jsonData);
  // Perform any necessary processing with the JSON data
  // For example, you can save it to a database or perform some calculations

  // Send a response
  res.json({ message: 'Data received successfully', data : jsonData });
};

// Get Data
exports.testGet = (req, res) => {
    // Retrieve data from the data model
    const data = dataModel.getData();
  
    // Send a response with the retrieved data
    res.json({ data });
  };
  
