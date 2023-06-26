$('#calendar').datetimepicker({
    inline: true,
    format: 'L'
});

$('#calendar').on('change.datetimepicker', function(e) {
    var selectedDate = e.date.format('YYYY-MM-DD');
    updateHeartAlertsTable(selectedDate);
    updateDriveAlertsTable(selectedDate);
});

function onPageLoad(){
    var currentDate = new Date();
    var year = currentDate.getFullYear();
    var month = String(currentDate.getMonth() + 1).padStart(2, '0');
    var day = String(currentDate.getDate()).padStart(2, '0');
    var formattedDate = year + '-' + month + '-' + day;  

    updateDriveAlertsTable(formattedDate);
    updateHeartAlertsTable(formattedDate);
}

onPageLoad();

// HEART ALERTS TABLE

function updateHeartAlertsTable(date) {
    var alertList = [];
  
    getHeartAlerts(date)
      .then(data => {
        alertList.push(data);

        var tableContainer = document.getElementById('hrList');
        tableContainer.innerHTML = ''; //empty the table
        // Iterate through the JSON data
        for (var i = 0; i < alertList[0].length; i++) {
          // Create a new row
          var row = document.createElement('tr');
        
          // Create and populate the cells
          var dateCell = document.createElement('td');
          dateCell.textContent = alertList[0][i].date;
          row.appendChild(dateCell);
        
          var outlierCell = document.createElement('td');
          outlierCell.textContent = alertList[0][i].outlier;
          row.appendChild(outlierCell);
        
          var vehicleCell = document.createElement('td');
          vehicleCell.textContent = alertList[0][i].vehicle;
          row.appendChild(vehicleCell);
        
          // Append the row to the table
          tableContainer.appendChild(row);
        }
      })
      .catch(error => {
        console.error(error);
      });
}
  
function getHeartAlerts(date) {
    return new Promise((resolve, reject) => {
      var url = `http://localhost:3000/api/get/heartAlert/date/${date}`;
  
      fetch(url)
        .then(response => response.json())
        .then(data => {
          // Create a new array with desired fields
          var modifiedData = data.map(item => {
            return {
              date: item.timestamp.date + 'T' + item.timestamp.time,
              outlier: parseInt(item.heartRate.value) + ' ' + item.heartRate.unitMeasure,
              vehicle: item.vehicleID
            };
          });
  
          resolve(modifiedData);
        })
        .catch(error => {
          reject(error);
        });
    });
}
  
// DRIVE ALERTS TABLE

function updateDriveAlertsTable(date) {
    var alertList = [];
  
    getDriveAlerts(date)
      .then(data => {
        alertList.push(data);

        var tableContainer = document.getElementById('ddList');
        tableContainer.innerHTML = ''; //empty the table
        // Iterate through the JSON data
        for (var i = 0; i < alertList[0].length; i++) {
          // Create a new row
          var row = document.createElement('tr');
        
          // Create and populate the cells
          var dateCell = document.createElement('td');
          dateCell.textContent = alertList[0][i].date;
          row.appendChild(dateCell);
        
          var outlierCell = document.createElement('td');
          outlierCell.textContent = alertList[0][i].outlier;
          row.appendChild(outlierCell);
        
          var vehicleCell = document.createElement('td');
          vehicleCell.textContent = alertList[0][i].vehicle;
          row.appendChild(vehicleCell);
        
          // Append the row to the table
          tableContainer.appendChild(row);
        }
      })
      .catch(error => {
        console.error(error);
      });
}
  
function getDriveAlerts(date) {
    return new Promise((resolve, reject) => {
      var url = `http://localhost:3000/api/get/driveAlert/date/${date}`;
  
      fetch(url)
        .then(response => response.json())
        .then(data => {
          // Create a new array with desired fields
          var modifiedData = data.map(item => {
            return {
              date: item.timestamp.date + 'T' + item.timestamp.time,
              outlier: parseFloat(item.acceleration.value).toFixed(2) + ' ' + item.acceleration.unitMeasure,
              vehicle: item.vehicleID
            };
          });
  
          resolve(modifiedData);
        })
        .catch(error => {
          reject(error);
        });
    });
}

