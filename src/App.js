import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import StockQuote from './components/stockQuote';
import BudgetCalculator from './components/budgetCalculator'; 
import NewsComponent from './components/stockNewsCard';
import CompanyNewsContainer from './components/CompanyNewsContainer'
import StockNewsContainer from './components/stockNewsContainer'
import BudgetGraph from './components/budgetGraph'; 

function App() {
  const [budgetData, setBudgetData] = useState({
    income: null,
    expenses: {
      needs: null,
      wants: null,
      savings: null,
    },
    idealPercentages: {
      necessities: 50,
      wants: 30,
      savings: 20,
    },
  });

  const handleInputChange = (data) => {
    // Update the parent state
    setBudgetData((prevData) => ({
      ...prevData,
      ...data,
    }));
  };

  return (
    <div className="App">
      <div className="StockBudget">
        {/* Pass budgetData and handleInputChange as props to BudgetCalculator */}
        <StockQuote/> 
        <BudgetCalculator budgetData={budgetData} onInputChange={handleInputChange} />
        {/* Pass necessary data as props to BudgetGraph */}
        <BudgetGraph income={budgetData.income} needs={budgetData.expenses.needs} wants={budgetData.expenses.wants} savings={budgetData.expenses.savings} />
      </div>
      <CompanyNewsContainer/>
      <StockNewsContainer/>
    </div>
  );
}

export default App;
