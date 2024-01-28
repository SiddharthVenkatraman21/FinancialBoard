<<<<<<< HEAD
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
=======
// BudgetGraph.js
import React from 'react';
import './css/budgetGraph.css';

function BudgetGraph({ income, needs, wants, savings }) {
  const calculatePercentage = (value) => {
    return value ? ((value / income) * 100).toFixed(2) + '%' : '';
  };
  

  return (
    <div className="budget-graph-container">
      <h2>Budget Graph</h2>
      <div className="space"></div>
      <p className="income-section">Income: {income}</p>
      {needs !== null && (
        <p className="needs-section">Needs: {calculatePercentage(needs)}</p>
      )}
      {wants !== null && (
        <p className="wants-section">Wants: {calculatePercentage(wants)}</p>
      )}
      {savings !== null && (
        <p className="savings-section">Savings: {calculatePercentage(savings)}</p>
      )}
      <div className="space"></div>
      <div className="bar-chart">
        <div className="bar income-bar" style={{ width: income ? '100%' : '0%' }}></div>
        <div className="bar needs-bar" style={{ width: needs ? calculatePercentage(needs) : '0%' }}></div>
        <div className="bar wants-bar" style={{ width: wants ? calculatePercentage(wants) : '0%' }}></div>
        <div className="bar savings-bar" style={{ width: savings ? calculatePercentage(savings) : '0%' }}></div>
      </div>
    </div>

    
  );
}

export default BudgetGraph;
>>>>>>> main
