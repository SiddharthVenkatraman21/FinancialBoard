import React, { useEffect, useState } from 'react';
import { db } from './firebase'; // Update the import path based on your file structure
import './css/savingsPage.css'; // Import the CSS file

function SavingsPage() {
  const [data, setData] = useState({
    months: [],
    expenses: [],
    savings: [],
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch data from Firebase
        const snapshot = await db.collection('your_collection_name').doc('your_document_id').get();
        const userData = snapshot.data();

        // Extract data for the table
        const months = userData.months_recorded || [];
        const expenses = userData.monthly_total_expenses || [];
        const savings = userData.monthly_savings || [];

        setData({
          months,
          expenses,
          savings,
        });
      } catch (error) {
        console.error('Error fetching data:', error.message);
      }
    };

    fetchData();
  }, []); // Empty dependency array to run the effect only once

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
