// OVERALL HEART RATE COUNT
function updateHeartRateCounters(){
    // Fetch the count value from the API
    fetch('http://localhost:3000/api/get/heartAlert/count')
    .then(response => response.json())
    .then(data => {
    // Get the total count value
        const totalCount = data.total;
        const monthlyCount = data.monthly;

        // Update the HTML element with the count value
        const totalCountElement = document.getElementById('totalHRA');
        const monthlyCountElement = document.getElementById('monthlyHRA');
        totalCountElement.textContent = totalCount;
        monthlyCountElement.textContent = monthlyCount;
    })
    .catch(error => {
        console.error(error);
    });
}

// OVERALL HEART RATE COUNT
function updateDriveCounters(){
    // Fetch the count value from the API
    fetch('http://localhost:3000/api/get/driveAlert/count')
    .then(response => response.json())
    .then(data => {
    // Get the total count value
        const totalCount = data.total;
        const monthlyCount = data.monthly;

        // Update the HTML element with the count value
        const totalCountElement = document.getElementById('totalDA');
        const monthlyCountElement = document.getElementById('monthlyDA');
        totalCountElement.textContent = totalCount;
        monthlyCountElement.textContent = monthlyCount;
    })
    .catch(error => {
        console.error(error);
    });
}

// WEEKLY HEART ALERT CHART
var ctx1 = document.getElementById('heart-chart').getContext('2d')
var weeklyHeartAlertsChart = new Chart(ctx1, {
    type: "bar",
    data: {
        labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
        datasets: [{
            label: "Heart Rate Alert Number",
            data: [0, 0, 0, 0, 0, 0, 0],
            backgroundColor: "rgba(0, 156, 255, .7)"
        }]
    },
    options: {
        responsive: true,
    }
});

function updateWeeklyHeartAlertsChart() {
    var currentDate = new Date();
    var lastSevenDays = [];
    for (var i = 6; i >= 0; i--) {
      var day = new Date();
      day.setDate(currentDate.getDate() - i);
      lastSevenDays.push(day.toISOString().split('T')[0]);
    }
  
    var newLabels = [];
    var newData = [];
    var promises = [];
  
    for (var i = 0; i < lastSevenDays.length; i++) {
      newLabels.push(lastSevenDays[i]);
      promises.push(getHeartAlertsCountByDate(lastSevenDays[i]));
    }
  
    Promise.all(promises)
      .then(results => {
        results.forEach(result => {
          newData.push(result.count || 0);
        });
  
        weeklyHeartAlertsChart.data.labels = newLabels;
        weeklyHeartAlertsChart.data.datasets[0].data = newData;
        weeklyHeartAlertsChart.update();
      })
      .catch(error => {
        console.error(error);
      });
}

function getHeartAlertsCountByDate(date) {
return new Promise((resolve, reject) => {
    var url = `http://localhost:3000/api/get/heartAlert/date/${date}/count`;

    fetch(url)
    .then(response => response.json())
    .then(data => {
        resolve(data);
    })
    .catch(error => {
        reject(error);
    });
});
}
  
// WEEKLY DRIVE ALERT CHART
var ctx2 = document.getElementById('drive-chart').getContext('2d')
var weeklyDriveAlertsChart = new Chart(ctx2, { // Updated variable name to ctx2
    type: "bar",
    data: {
        labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
        datasets: [{
            label: "Dangerous Drive Alert Number",
            data: [0, 0, 0, 0, 0, 0, 0],
            backgroundColor: "rgba(0, 156, 255, .7)"
        }]
    },
    options: {
        responsive: true
    }
});

function updateWeeklyDriveAlertsChart() {
    var currentDate = new Date();
    var lastSevenDays = [];
    for (var i = 6; i >= 0; i--) {
      var day = new Date();
      day.setDate(currentDate.getDate() - i);
      lastSevenDays.push(day.toISOString().split('T')[0]);
    }
  
    var newLabels = [];
    var newData = [];
    var promises = [];
  
    for (var i = 0; i < lastSevenDays.length; i++) {
      newLabels.push(lastSevenDays[i]);
      promises.push(getDriveAlertsCountByDate(lastSevenDays[i]));
    }
  
    Promise.all(promises)
      .then(results => {
        results.forEach(result => {
          newData.push(result.count || 0);
        });
  
        weeklyDriveAlertsChart.data.labels = newLabels;
        weeklyDriveAlertsChart.data.datasets[0].data = newData;
        weeklyDriveAlertsChart.update();
      })
      .catch(error => {
        console.error(error);
      });
}

function getDriveAlertsCountByDate(date) {
return new Promise((resolve, reject) => {
    var url = `http://localhost:3000/api/get/driveAlert/date/${date}/count`;

    fetch(url)
    .then(response => response.json())
    .then(data => {
        resolve(data);
    })
    .catch(error => {
        reject(error);
    });
});
}

// TIME HEART ALERT CHART
var ctx3 = document.getElementById('heart-time-chart').getContext('2d')
var timeHeartAlertsChart = new Chart(ctx3, { // Updated variable name to ctx2
    type: "doughnut",
    data: {
        labels: ["00:00 - 08:00", "08:00-16:00", "16:00-00:00"],
        datasets: [{
            label: "Dangerous Drive Alert Number",
            data: [0, 0, 0],
            backgroundColor: ["#6699ff", "#3366ff", "#3333ff"]
        }]
    },
    options: {
        responsive: true
    }
});

function updateTimeHeartAlertChart() {
    getTimeHeartAlerts()
        .then(data => {
            var newData = [data['00:00-08:00'], data['08:00-16:00'], data['16:00-00:00']];
            document.getElementById("hrTime0").textContent = data['00:00-08:00'];
            document.getElementById("hrTime1").textContent = data['08:00-16:00'];
            document.getElementById("hrTime2").textContent = data['16:00-00:00'];
            timeHeartAlertsChart.data.datasets[0].data = newData;
            timeHeartAlertsChart.update();
        })
        .catch(error => {
            console.error(error);
        });
}

function getTimeHeartAlerts() {
    var url = `http://localhost:3000/api/get/heartAlert/time`;
    return fetch(url)
        .then(response => response.json())
        .catch(error => {
            console.error(error);
            throw error;
        });
}

// TIME DRIVE ALERT CHART
var ctx4 = document.getElementById('drive-time-chart').getContext('2d')
var timeDriveAlertsChart = new Chart(ctx4, { // Updated variable name to ctx2
    type: "doughnut",
    data: {
        labels: ["00:00 - 08:00", "08:00-16:00", "16:00-00:00"],
        datasets: [{
            label: "Dangerous Drive Alert Number",
            data: [0, 0, 0],
            backgroundColor: ["#6699ff", "#3366ff", "#3333ff"]
        }]
    },
    options: {
        responsive: true
    }
});

function updateTimeDriveAlertChart() {
    getTimeDriveAlerts()
        .then(data => {
            var newData = [data['00:00-08:00'], data['08:00-16:00'], data['16:00-00:00']];
            document.getElementById("ddTime0").textContent = data['00:00-08:00'];
            document.getElementById("ddTime1").textContent = data['08:00-16:00'];
            document.getElementById("ddTime2").textContent = data['16:00-00:00'];
            timeDriveAlertsChart.data.datasets[0].data = newData;
            timeDriveAlertsChart.update();
        })
        .catch(error => {
            console.error(error);
        });
}

function getTimeDriveAlerts() {
    var url = `http://localhost:3000/api/get/driveAlert/time`;
    return fetch(url)
        .then(response => response.json())
        .catch(error => {
            console.error(error);
            throw error;
        });
}

// LOGICA DI UPDATE DELLA DASHBOARD
updateHeartRateCounters();
updateDriveCounters();
updateWeeklyHeartAlertsChart();
updateWeeklyDriveAlertsChart();
updateTimeHeartAlertChart();
updateTimeDriveAlertChart();

setInterval(() => {
    updateHeartRateCounters();
    updateDriveCounters();
    updateWeeklyHeartAlertsChart();
    updateWeeklyDriveAlertsChart();
    updateTimeHeartAlertChart();
    updateTimeDriveAlertChart();
  }, 5000);