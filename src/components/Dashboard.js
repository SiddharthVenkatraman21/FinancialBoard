import React from 'react';
import { Link } from 'react-router-dom';
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
          <div>
            {/* Use Link component for navigation */}
            <Link to="/recommendation" className='cta-button'>Investments</Link>
            <Link to="/budget" className='cta-button secondary'>Budget</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
