const express = require('express');
const router = express.Router();

// Import the controller
const apiController = require('../controllers/apiController');

// Define routes
router.post('/testPost', apiController.testPost);
router.get('/testGet', apiController.testGet);

module.exports = router;
