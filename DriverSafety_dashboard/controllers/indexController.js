// indexController.js
const path = require('path');

// Home method for handling the '/' route
exports.home = (req, res) => {
    const filePath = path.join(__dirname, '../views/home.html');
    res.sendFile(filePath);
};
  
// About method for handling the '/about' route
exports.about = (req, res) => {
    const filePath = path.join(__dirname, '../views/about.html');
    res.sendFile(filePath);
};

exports.alertsList = (req, res) => {
    const filePath = path.join(__dirname, '../views/alertsList.html');
    res.sendFile(filePath);
};
