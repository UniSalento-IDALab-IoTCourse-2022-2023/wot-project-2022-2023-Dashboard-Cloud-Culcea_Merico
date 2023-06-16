// Import the data model
const heartAlertModel = require('../models/heartAlertModel.js');
const driveAlertModel = require('../models/driveAlertModel.js');

exports.heartAlertPost = (req, res) => {
  // Access the JSON data from the request body
  const jsonData = req.body;

  // Create a new instance of the HeartAlert model with the JSON data
  const heartAlert = new heartAlertModel({
    timestamp: jsonData.timestamp,
    value: jsonData.value,
    vehicleID: jsonData.vehicleID
  });

  // Save the heartAlert instance to the database
  heartAlert.save()
    .then(() => {
      // Data saved successfully
      res.json({ message: 'Data saved successfully', data: jsonData });
    })
    .catch((error) => {
      // Error occurred while saving data
      res.status(500).json({ error: 'An error occurred while saving data' });
    });
};

exports.driveAlertPost = (req, res) => {
  // Access the JSON data from the request body
  const jsonData = req.body;
  console.log(jsonData);
  // Create a new instance of the HeartAlert model with the JSON data
  const driveAlert = new driveAlertModel({
    timestamp:{
      date: jsonData.timestamp.date,
      time: jsonData.timestamp.time
    },
    value: jsonData.value,
    vehicleID: jsonData.vehicleID
  });

  // Save the heartAlert instance to the database
  driveAlert.save()
    .then(() => {
      // Data saved successfully
      res.json({ message: 'Data saved successfully', data: jsonData });
    })
    .catch((error) => {
      // Error occurred while saving data
      res.status(500).json({ error: 'An error occurred while saving data' });
    });
};

exports.getHeartAlertsCountByDate = (req, res) => {
  const { year, month, day } = req.params;
  const requestedDate = year + "-"+ month + "-" + day;

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
        res.json({ date: requestedDate, count: result[0].count });
      } else {
        res.json({ date: requestedDate, count: 0 });
      }
    })
    .catch((error) => {
      // Handle any error that occurred during the aggregation
      res.status(500).json({ error: 'An error occurred while fetching the data' });
    });
};

exports.getDriveAlertsCountByDate = (req, res) => {
  const { year, month, day } = req.params;
  const requestedDate = year + "-"+ month + "-" + day;

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
        res.json({ date: requestedDate, count: result[0].count });
      } else {
        res.json({ date: requestedDate, count: 0 });
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

      res.json(response);
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

      res.json(response);
    })
    .catch((error) => {
      res.status(500).json({ error: 'An error occurred while fetching the data' });
    });
};
