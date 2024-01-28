import React, { useEffect, useState } from 'react';
import { db } from './firebase'; // Update the import path based on your file structure
import './css/savingsPage.css';

function SavingsPage() {
  // Define state to store data retrieved from Firebase
  const [data, setData] = useState({
    months: [],
    expenses: [],
    savings: [],
  });

  // Use useEffect hook to fetch data from Firebase when the component mounts
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch data from Firebase
        const snapshot = await db.collection('users').doc('cHpa7n3YHBYRZ8Dlw1eB').get();
        const userData = snapshot.data();

        // Extract data for the table
        const months = userData.months_recorded || [];
        const expenses = userData.monthly_total_expenses || [];
        const savings = userData.monthly_savings || [];

        console.log(months, expenses, savings);

        // Update state with fetched data
        setData({
          months,
          expenses,
          savings,
        });
      } catch (error) {
        console.error('Error fetching data:', error.message);
      }
    };

    // Call fetchData function when the component mounts
    fetchData();
  }, []); // Empty dependency array to run the effect only once when the component mounts

  return (
    <div>
      <h2>Savings Page</h2>
      <table>
        <thead>
          <tr>
            <th>Month</th>
            <th>Expenses</th>
            <th>Savings</th>
          </tr>
        </thead>
        <tbody>
          {/* Map over the months array to render table rows */}
          {data.months.map((month, index) => (
            <tr key={index}>
              <td>{month}</td>
              <td>${data.expenses[index]}</td>
              <td>${data.savings[index]}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default SavingsPage;
