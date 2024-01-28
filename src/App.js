import React from 'react';
import logo from './logo.svg';
import './App.css';
import StockQuote from './components/stockQuote';
import BudgetCalculator from './components/budgetCalculator'; 
import NewsComponent from './components/stockNewsCard';



function App() {
  return (
    <div className="App">
      <header className="App-header">
        {/* <StockQuote />
        <BudgetCalculator />  */}
        <NewsComponent/>
      </header>
    </div>
  );
}

export default App;
