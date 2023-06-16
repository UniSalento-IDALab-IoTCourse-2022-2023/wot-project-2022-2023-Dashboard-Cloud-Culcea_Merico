const express = require('express');
const router = express.Router();

// Import the controller
const indexController = require('../controllers/indexController');

// Define routes
router.get('/', indexController.home);
router.get('/about', indexController.about);

module.exports = router;