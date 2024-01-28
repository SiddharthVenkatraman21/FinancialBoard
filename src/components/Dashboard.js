// Dashboard.js

import React from 'react';
import './css/Dashboard.css';

function Dashboard() {
  return (
    <div className="dashboard">
      <div className="content-container">
        <h1 className="title">Financial Planner Pro</h1>
        <p className="description">
          Explore the latest trends in the financial world while tracking your personal financial responsibility!
        </p>
        <div className="cta-container">
          <button className="cta-button">Investments</button>
          <button className="cta-button secondary">Savings</button>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
