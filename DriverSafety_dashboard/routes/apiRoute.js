const express = require('express');
const router = express.Router();

// Import the controller
const apiController = require('../controllers/apiController');

// Define routes
router.post('/post/heartAlert', apiController.heartAlertPost);
router.post('/post/driveAlert', apiController.driveAlertPost);

router.get('/get/heartAlert/count', apiController.getHeartAlertCount);
router.get('/get/driveAlert/count', apiController.getDriveAlertCount);
router.get('/get/heartAlert/date/:requestedDate/count', apiController.getHeartAlertsCountByDate);
router.get('/get/driveAlert/date/:requestedDate/count', apiController.getDriveAlertsCountByDate);
router.get('/get/heartAlert/time', apiController.getHeartAlertsCountByTime);
router.get('/get/driveAlert/time', apiController.getDriveAlertsCountByTime);

router.get('/get/heartAlert/date/:requestedDate', apiController.getHeartAlertsByDate);
router.get('/get/driveAlert/date/:requestedDate', apiController.getDriveAlertsByDate);

module.exports = router;
