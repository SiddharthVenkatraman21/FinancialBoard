import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import StockQuote from './components/stockQuote';
import BudgetCalculator from './components/budgetCalculator'; 
import CompanyNewsContainer from './components/CompanyNewsContainer';
import StockNewsContainer from './components/stockNewsContainer';
import RecommendationWidget from './components/recomendationChart';
import Navbar from './components/navbar'
import CompareView from './components/compareview'
import AnalysisPage from './components/analysisPage'
import Login from './components/Login';
import Register from './components/Register';
import Reset from './components/Reset';
import BudgetPage from './components/budgetPage';
import Dashboard from './components/Dashboard'
import CreditPage from './components/creditPage';
import SavingsPage from './components/savingsPage';

function App() {
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 768); // You can adjust this threshold as needed
    };

    // Initial check
    handleResize();

    // Listen for window resize events
    window.addEventListener('resize', handleResize);

    // Clean up event listener
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <Router>
      <div className="mainBody">
        {!isSmallScreen && <Navbar />}
        {isSmallScreen ? (
          <div style={{ backgroundColor: '#007bff', color: 'white', padding: '20px', marginTop:'10%', textAlign: 'center', borderRadius: '10px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)' }}>
            <h2>This website is intended for viewing on a laptop or computer</h2>
            <p>Please resize your browser window for the best experience.</p>
          </div>
        ) : null /* Remove the Routes wrapper for small screens */}
        <Routes>
          <Route element={<Dashboard />} />
          <Route path="/FinancialBoard/" element={<Dashboard />} />
          <Route path="/FinancialBoard/login" element={<Login />} />
          <Route path="/FinancialBoard/register" element={<Register />} />
          <Route path="/FinancialBoard/reset" element={<Reset />} />
          <Route path="/FinancialBoard/compare" element={<CompareView />} />
          <Route path="/FinancialBoard/recommendation" element={<AnalysisPage />} />
          <Route path="/FinancialBoard/budget" element={<BudgetPage />} />
          <Route path="/FinancialBoard/credit" element={<CreditPage />} />
          {/* <Route path="/savingsPage" element={<SavingsPage/>} /> */}
          {/* <Route path="/contacts" element={<Contacts/>} />
          <Route path="/map" element={<Map/>} /> */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
