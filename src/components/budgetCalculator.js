import React, { useState } from 'react';
import './css/budgetCalculator.css'; // Add your CSS file path

function BudgetCalculator() {
  const [income, setIncome] = useState(null);
  const [expenses, setExpenses] = useState({
    needs: null,
    wants: null,
    savings: null,
  });

  const handleIncomeChange = (event) => {
    const value = parseFloat(event.target.value) || null;
    setIncome(value);
  };

  const handleExpenseChange = (event, category) => {
    const value = parseFloat(event.target.value) || null;
    setExpenses((prevExpenses) => ({
      ...prevExpenses,
      [category]: value,
    }));
  };

  const calculateBudget = () => {
    const necessitiesPercentage = (expenses.needs / income) * 100 || 0;
    const wantsPercentage = (expenses.wants / income) * 100 || 0;
    const savingsPercentage = (expenses.savings / income) * 100 || 0;

    const necessitiesBudget = income * 0.5;
    const wantsBudget = income * 0.3;
    const savingsBudget = income * 0.2;

    const remainingNecessitiesBudget = necessitiesBudget - expenses.needs;
    const remainingWantsBudget = wantsBudget - expenses.wants;
    const remainingSavingsBudget = expenses.savings - savingsBudget; // Adjusted for savings

    return {
      necessities: necessitiesPercentage,
      wants: wantsPercentage,
      savings: savingsPercentage,
      remainingNecessitiesBudget: remainingNecessitiesBudget,
      remainingWantsBudget: remainingWantsBudget,
      remainingSavingsBudget: remainingSavingsBudget,
    };
  };

  const budgetData = calculateBudget();

  const getRemainingBudgetMessage = (category, remainingBudget) => {
    if (income === null || expenses[category] === null) {
      return ''; // Display nothing if income or expense is not provided
    }

    if (remainingBudget < 0) {
      if (category === 'savings') {
        return `You need to add $${Math.abs(remainingBudget).toFixed(2)} more next month to meet your savings goal!`;
      } else {
        return `You need to spend $${Math.abs(remainingBudget).toFixed(2)} less next month in ${category}!`;
      }
    } else if (remainingBudget > 0) {
    if (category === 'savings') 
    {
        return `Congrats on saving an extra $${Math.abs(remainingBudget).toFixed(2)} beyond your goal!`;
    }
      return `Congrats on saving $${remainingBudget.toFixed(2)} in ${category} this month!`;
    } else {
      return `You've perfectly followed your budget in ${category} this month!`;
    }
  };

  return (
    <div className="budget-calculator-container">
      <div>
      <h2>Your Monthly Income</h2>
        <label htmlFor="incomeInput">Please input your monthly income:</label>
        <input
          type="number"
          id="incomeInput"
          value={income === null ? '' : income}
          onChange={handleIncomeChange}
        />
      </div>
      <div>
        <h2>Your Expenses This Month</h2>
        <label htmlFor="needsInput">Monthly Needs:</label>
        <input
          type="number"
          id="needsInput"
          value={expenses.needs === null ? '' : expenses.needs}
          onChange={(e) => handleExpenseChange(e, 'needs')}
        />
      </div>
      <div>
        <label htmlFor="wantsInput">Monthly Wants:</label>
        <input
          type="number"
          id="wantsInput"
          value={expenses.wants === null ? '' : expenses.wants}
          onChange={(e) => handleExpenseChange(e, 'wants')}
        />
      </div>
      <div>
        <label htmlFor="savingsInput">Monthly Savings/Debt Repayments:</label>
        <input
          type="number"
          id="savingsInput"
          value={expenses.savings === null ? '' : expenses.savings}
          onChange={(e) => handleExpenseChange(e, 'savings')}
        />
      </div>
      <div className="budget-results">
        <h2>Your Ideal Budget</h2>
        <p>50% for necessities: {(income * 0.5).toFixed(2)}</p>
        <p>30% for wants: {(income * 0.3).toFixed(2)}</p>
        <p>20% for savings: {(income * 0.2).toFixed(2)}</p>
      </div>
      <div className="remaining-budget">
        <h2>Your Budget Corrections</h2>
        {expenses.needs !== null && <p>Necessities: {getRemainingBudgetMessage('necessities', budgetData.remainingNecessitiesBudget)}</p>}
        {expenses.wants !== null && <p>Wants: {getRemainingBudgetMessage('wants', budgetData.remainingWantsBudget)}</p>}
        {expenses.savings !== null && <p>Savings: {getRemainingBudgetMessage('savings', budgetData.remainingSavingsBudget)}</p>}
      </div>
    </div>
  );
}

export default BudgetCalculator;
