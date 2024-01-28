import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import StockQuote from './components/stockQuote';
import BudgetCalculator from './components/budgetCalculator'; 
import NewsComponent from './components/stockNewsCard';
import CompanyNewsContainer from './components/CompanyNewsContainer'
import StockNewsContainer from './components/stockNewsContainer'



function App() {

  

    

  return (
    <div className="App">
      
      {/* <BudgetCalculator/>
      <StockQuote/> */}
      <div className="StockBudget">
        <StockQuote/>
        <BudgetCalculator/>
      </div>
      <CompanyNewsContainer/>
      <StockNewsContainer/>
    </div>
  );
}

export default App;
