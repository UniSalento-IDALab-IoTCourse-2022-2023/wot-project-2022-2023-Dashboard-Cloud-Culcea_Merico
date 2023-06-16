const express = require('express');
const router = express.Router();

// Import the controller
const apiController = require('../controllers/apiController');

// Define routes
router.post('/post/heartAlert', apiController.heartAlertPost);
router.post('/post/driveAlert', apiController.driveAlertPost);

router.get('/get/heartAlert/date/:year/:month/:day', apiController.getHeartAlertsCountByDate);
router.get('/get/driveAlert/date/:year/:month/:day', apiController.getDriveAlertsCountByDate);
router.get('/get/heartAlert/time', apiController.getHeartAlertsCountByTime);
router.get('/get/driveAlert/time', apiController.getDriveAlertsCountByTime);

module.exports = router;
