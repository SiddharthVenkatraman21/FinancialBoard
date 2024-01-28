import React from 'react';
import logo from './logo.svg';
import './App.css';
import StockQuote from './components/stockQuote';
import BudgetCalculator from './components/budgetCalculator'; 


function App() {
  return (
    <div className="App">
      <header className="App-header">
        {/* <StockQuote /> */}
        <BudgetCalculator />
      </header>
    </div>
  );
}

export default App;
