var ctx1 = document.getElementById('heart-chart').getContext('2d')
var myChart1 = new Chart(ctx1, {
    type: "bar",
    data: {
        labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
        datasets: [{
            label: "Heart Rate Alert Number",
            data: [15, 30, 55, 65, 60, 80, 95],
            backgroundColor: "rgba(0, 156, 255, .7)"
        }]
    },
    options: {
        responsive: true
    }
});

var ctx2 = document.getElementById('drive-chart').getContext('2d')
var myChart2 = new Chart(ctx2, { // Updated variable name to ctx2
    type: "bar",
    data: {
        labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
        datasets: [{
            label: "Dangerous Drive Alert Number",
            data: [15, 30, 55, 65, 60, 80, 95],
            backgroundColor: "rgba(0, 156, 255, .7)"
        }]
    },
    options: {
        responsive: true
    }
});

var ctx3 = document.getElementById('heart-time-chart').getContext('2d')
var myChart3 = new Chart(ctx3, { // Updated variable name to ctx2
    type: "doughnut",
    data: {
        labels: ["00:00 - 08:00", "09:00-16:00", "17:00-23:00"],
        datasets: [{
            label: "Dangerous Drive Alert Number",
            data: [15, 30, 55],
            backgroundColor: ["#6699ff", "#3366ff", "#3333ff"]
        }]
    },
    options: {
        responsive: true
    }
});

var ctx4 = document.getElementById('drive-time-chart').getContext('2d')
var myChart4 = new Chart(ctx4, { // Updated variable name to ctx2
    type: "doughnut",
    data: {
        labels: ["00:00 - 08:00", "09:00-16:00", "17:00-23:00"],
        datasets: [{
            label: "Dangerous Drive Alert Number",
            data: [67, 35, 25],
            backgroundColor: ["#6699ff", "#3366ff", "#3333ff"]
        }]
    },
    options: {
        responsive: true
    }
});
