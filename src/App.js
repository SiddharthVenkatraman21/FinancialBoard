import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import StockQuote from './components/stockQuote';
import BudgetCalculator from './components/budgetCalculator'; 
import NewsComponent from './components/stockNewsCard';
import CompanyNewsContainer from './components/CompanyNewsContainer'
import StockNewsContainer from './components/stockNewsContainer'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from './components/Login';
import Register from './components/Register';
import Reset from './components/Reset';

function App() {

  return (
    <div className="App">
<Router>
  <Routes>
    <Route path="/" element={<Login />} />
    <Route path="/register" element={<Register />} />
    <Route path="/reset" element={<Reset />} />
    <Route path="/dashboard" element={
      <div>
        <div className="StockBudget">
          <StockQuote/>
          <BudgetCalculator/>
        </div>
        <CompanyNewsContainer/>
        <StockNewsContainer/>
      </div>
    } />
    </Routes>
  </Router>
    </div>
  );
}

export default App;
