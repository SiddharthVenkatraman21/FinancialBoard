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
