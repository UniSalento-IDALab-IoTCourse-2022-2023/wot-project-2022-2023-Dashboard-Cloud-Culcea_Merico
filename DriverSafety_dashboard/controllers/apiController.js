// Import the data model
const heartAlertModel = require('../models/heartAlertModel.js');
const driveAlertModel = require('../models/driveAlertModel.js');

exports.heartAlertPost = (req, res) => {
  // Access the JSON data from the request body
  const jsonData = req.body;

  // Create a new instance of the HeartAlert model with the JSON data
  const heartAlert = new heartAlertModel({
    timestamp: jsonData.timestamp,
    heartRate: jsonData.heartRate,
    vehicleID: jsonData.vehicleID
  });

  // Save the heartAlert instance to the database
  heartAlert.save()
    .then(() => {
      // Data saved successfully
      res.status(200).json({ message: 'Data saved successfully', data: jsonData });
    })
    .catch((error) => {
      // Error occurred while saving data
      res.status(500).json({ error: 'An error occurred while saving data' });
    });
};

exports.driveAlertPost = (req, res) => {
  // Access the JSON data from the request body
  const jsonData = req.body;
  // Create a new instance of the HeartAlert model with the JSON data
  const driveAlert = new driveAlertModel({
    timestamp: jsonData.timestamp,
    acceleration: jsonData.acceleration,
    vehicleID: jsonData.vehicleID
  });

  // Save the heartAlert instance to the database
  driveAlert.save()
    .then(() => {
      // Data saved successfully
      res.status(200).json({ message: 'Data saved successfully', data: jsonData });
    })
    .catch((error) => {
      // Error occurred while saving data
      res.status(500).json({ error: 'An error occurred while saving data' });
    });
};

exports.getHeartAlertCount = async (req, res) => {
  try {
    // Calculate the total count
    const totalCount = await heartAlertModel.countDocuments();

    // Calculate the monthly count
    const actualMonth = new Date();
    actualMonth.setMonth(actualMonth.getMonth() - 1);
    const monthlyCount = await heartAlertModel.countDocuments({ 'timestamp.date': { $gte: actualMonth.toISOString().split('T')[0] } });

    // Calculate the daily count
    const actualDay = new Date();
    actualDay.setHours(0, 0, 0, 0);
    const dailyCount = await heartAlertModel.countDocuments({ 'timestamp.date': actualDay.toISOString().split('T')[0] });

    // Return the counts as JSON response
    res.status(200).json({ total: totalCount, monthly: monthlyCount, daily: dailyCount });
  } catch (error) {
    // Handle any error that occurred during the counting
    res.status(500).json({ error: 'An error occurred while counting the documents' });
  }
};

exports.getDriveAlertCount = async (req, res) => {
  try {
    // Calculate the total count
    const totalCount = await driveAlertModel.countDocuments();

    // Calculate the monthly count
    const actualMonth = new Date();
    actualMonth.setMonth(actualMonth.getMonth() - 1);
    const monthlyCount = await driveAlertModel.countDocuments({ 'timestamp.date': { $gte: actualMonth.toISOString().split('T')[0] } });

    // Calculate the daily count
    const actualDay = new Date();
    actualDay.setHours(0, 0, 0, 0);
    const dailyCount = await driveAlertModel.countDocuments({ 'timestamp.date': actualDay.toISOString().split('T')[0] });

    // Return the counts as JSON response
    res.status(200).json({ total: totalCount, monthly: monthlyCount, daily: dailyCount });
  } catch (error) {
    // Handle any error that occurred during the counting
    res.status(500).json({ error: 'An error occurred while counting the documents' });
  }
};

exports.getHeartAlertsByDate = (req, res) => {
  const { requestedDate } = req.params;

  heartAlertModel.find(
    {
      'timestamp.date': requestedDate
    }
  ).then((result) => {
      if (result.length > 0) {
        res.status(200).json(result);
      } else {
        res.status(200).json(result);
      }
    })
    .catch((error) => {
      // Handle any error that occurred during the aggregation
      res.status(500).json({ error: 'An error occurred while fetching the data' });
    });
};

exports.getDriveAlertsByDate = (req, res) => {
  const { requestedDate } = req.params;

  driveAlertModel.find(
    {
      'timestamp.date': requestedDate
    }
  ).then((result) => {
      if (result.length > 0) {
        res.status(200).json(result);
      } else {
        res.status(200).json(result);
      }
    })
    .catch((error) => {
      // Handle any error that occurred during the aggregation
      res.status(500).json({ error: 'An error occurred while fetching the data' });
    });
};


exports.getHeartAlertsCountByDate = (req, res) => {
  const { requestedDate } = req.params;

  heartAlertModel.aggregate([
    {
      $match: {
        'timestamp.date': {
          $eq: requestedDate
        }
      }
    }, {
      $count: 'count'
    }
  ])
    .then((result) => {
      if (result.length > 0) {
        res.status(200).json({ date: requestedDate, count: result[0].count });
      } else {
        res.status(200).json({ date: requestedDate, count: 0 });
      }
    })
    .catch((error) => {
      // Handle any error that occurred during the aggregation
      res.status(500).json({ error: 'An error occurred while fetching the data' });
    });
};

exports.getDriveAlertsCountByDate = (req, res) => {
  const { requestedDate } = req.params;

  driveAlertModel.aggregate([
    {
      $match: {
        'timestamp.date': {
          $eq: requestedDate
        }
      }
    }, {
      $count: 'count'
    }
  ])
    .then((result) => {
      if (result.length > 0) {
        res.status(200).json({ date: requestedDate, count: result[0].count });
      } else {
        res.status(200).json({ date: requestedDate, count: 0 });
      }
    })
    .catch((error) => {
      // Handle any error that occurred during the aggregation
      res.status(500).json({ error: 'An error occurred while fetching the data' });
    });
};

exports.getDriveAlertsCountByTime = (req, res) => {
  const intervals = [
    { start: '00:00:00', end: '08:00:00', label: '00:00-08:00' },
    { start: '08:00:00', end: '16:00:00', label: '08:00-16:00' },
    { start: '16:00:00', end: '23:59:59', label: '16:00-00:00' }
  ];

  const promises = intervals.map((interval) => {
    return driveAlertModel.aggregate([
      {
        $match: {
          'timestamp.time': {
            $gte: interval.start,
            $lt: interval.end
          }
        }
      },
      {
        $count: 'count'
      }
    ])
      .then((result) => {
        if (result.length > 0) {
          interval.count = result[0].count;
        } else {
          interval.count = 0;
        }
      });
  });

  Promise.all(promises)
    .then(() => {
      const response = intervals.reduce((acc, interval) => {
        acc[interval.label] = interval.count;
        return acc;
      }, {});

      res.status(200).json(response);
    })
    .catch((error) => {
      res.status(500).json({ error: 'An error occurred while fetching the data' });
    });
};

exports.getHeartAlertsCountByTime = (req, res) => {
  const intervals = [
    { start: '00:00:00', end: '08:00:00', label: '00:00-08:00' },
    { start: '08:00:00', end: '16:00:00', label: '08:00-16:00' },
    { start: '16:00:00', end: '23:59:59', label: '16:00-00:00' }
  ];

  const promises = intervals.map((interval) => {
    return heartAlertModel.aggregate([
      {
        $match: {
          'timestamp.time': {
            $gte: interval.start,
            $lt: interval.end
          }
        }
      },
      {
        $count: 'count'
      }
    ])
      .then((result) => {
        if (result.length > 0) {
          interval.count = result[0].count;
        } else {
          interval.count = 0;
        }
      });
  });

  Promise.all(promises)
    .then(() => {
      const response = intervals.reduce((acc, interval) => {
        acc[interval.label] = interval.count;
        return acc;
      }, {});

      res.status(200).json(response);
    })
    .catch((error) => {
      res.status(500).json({ error: 'An error occurred while fetching the data' });
    });
};
