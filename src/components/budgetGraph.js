// Initialize Firebase
var firebaseConfig = {
    // Your Firebase configuration
};
firebase.initializeApp(firebaseConfig);

// Get a reference to the database service
var database = firebase.database();

// Function to fetch budgeting data from Firebase
function fetchBudgetData() {
    var dataRef = firebase.database().ref('budget_data');
    dataRef.on('value', function(snapshot) {
        var data = snapshot.val();
        // Process the data and create the graph
        createGraph(data);
    });
}

// Function to create the graph using Chart.js
function createGraph(data) {
    var labels = [];
    var needsData = [];
    var wantsData = [];
    var savingsData = [];

    // Extracting data from Firebase snapshot
    for (var key in data) {
        if (data.hasOwnProperty(key)) {
            var monthData = data[key];
            labels.push(monthData[1] + '/' + monthData[0]); // Assuming month/year format
            needsData.push(monthData[3]);
            wantsData.push(monthData[4]);
            savingsData.push(monthData[5]);
        }
    }

    var ctx = document.getElementById('budgetChart').getContext('2d');
    var myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: 'Needs',
                data: needsData,
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 1
            }, {
                label: 'Wants',
                data: wantsData,
                backgroundColor: 'rgba(54, 162, 235, 0.2)',
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 1
            }, {
                label: 'Savings',
                data: savingsData,
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            }
        }
    });
}

// Call fetchBudgetData function to start fetching data from Firebase
fetchBudgetData();
