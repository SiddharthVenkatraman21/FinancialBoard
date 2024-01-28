import React, { useState } from 'react';
import './css/budgetCalculator.css'; // Add your CSS file path

function BudgetCalculator() {
  const [income, setIncome] = useState(null);
  const [expenses, setExpenses] = useState({
    needs: null,
    wants: null,
    savings: null,
  });
  const [idealPercentages, setIdealPercentages] = useState({
    necessities: 50,
    wants: 30,
    savings: 20,
  });
  const [selectedMonth, setSelectedMonth] = useState(1);
  const [selectedYear, setSelectedYear] = useState(2024);

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

  const handleIdealPercentageChange = (event, category) => {
    const value = parseFloat(event.target.value) || null;
    setIdealPercentages((prevPercentages) => ({
      ...prevPercentages,
      [category]: value,
    }));
  };

  const calculateBudget = () => {
    const necessitiesPercentage = (expenses.needs / income) * 100 || 0;
    const wantsPercentage = (expenses.wants / income) * 100 || 0;
    const savingsPercentage = (expenses.savings / income) * 100 || 0;

    const necessitiesBudget = (income * (idealPercentages.necessities / 100)) || 0;
    const wantsBudget = (income * (idealPercentages.wants / 100)) || 0;
    const savingsBudget = (income * (idealPercentages.savings / 100)) || 0;

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

    const categoryBudget = income * (idealPercentages[category] / 100);

    if (remainingBudget < 0) {
      if (category === 'savings') {
        return `You need to add $${Math.abs(remainingBudget).toFixed(2)} more next month to meet your savings goal! Your goal for this month was $${categoryBudget.toFixed(2)}.`;
      } else {
        return `You need to spend $${Math.abs(remainingBudget).toFixed(2)} less next month in ${category}! Your goal for this month was $${categoryBudget.toFixed(2)}.`;
      }
    } else if (remainingBudget > 0) {
      if (category === 'savings') {
        return `Congrats on saving an extra $${Math.abs(remainingBudget).toFixed(2)} beyond your goal! Your goal for this month was $${categoryBudget.toFixed(2)}.`;
      }
      return `Congrats on saving $${remainingBudget.toFixed(2)} in ${category} this month! Your goal for this month was $${categoryBudget.toFixed(2)}.`;
    } else {
      return `You've perfectly followed your budget in ${category} this month! Your goal for this month was $${categoryBudget.toFixed(2)}.`;
    }
  };

  const handleSave = () => {
    // Log the data to the console
    console.log({
      income,
      expenses,
      idealPercentages,
      selectedMonth,
      selectedYear,
      budgetData,
    });
  
    // Add logic to save data to a database if needed
    console.log('Data saved:', { income, expenses, idealPercentages, selectedMonth, selectedYear });
  };

  return (
    <div className="budget-calculator-container">
      <h1>Budget Calculator</h1>
      <div>
        <h2>Select Month and Year</h2>
        <label htmlFor="monthSelect">Month:</label>
        <select
          id="monthSelect"
          value={selectedMonth}
          onChange={(e) => setSelectedMonth(parseInt(e.target.value))}
        >
          <option value={1}>January</option>
          <option value={2}>February</option>
          <option value={3}>March</option>
          <option value={4}>April</option>
          <option value={5}>May</option>
          <option value={6}>June</option>
          <option value={7}>July</option>
          <option value={8}>August</option>
          <option value={9}>September</option>
          <option value={10}>October</option>
          <option value={11}>November</option>
          <option value={12}>December</option>
        </select>
        <label htmlFor="yearSelect">Year:</label>
        <select
          id="yearSelect"
          value={selectedYear}
          onChange={(e) => setSelectedYear(parseInt(e.target.value))}
        >
          {Array.from({ length: 101 }, (_, i) => 1950 + i).map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
      </div>
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
        <h2>Ideal Budget Percentages</h2>
        <label htmlFor="necessitiesPercentage">Necessities (%):</label>
        <input
          type="number"
          id="necessitiesPercentage"
          value={idealPercentages.necessities}
          onChange={(e) => handleIdealPercentageChange(e, 'necessities')}
        />
        <label htmlFor="wantsPercentage">Wants (%):</label>
        <input
          type="number"
          id="wantsPercentage"
          value={idealPercentages.wants}
          onChange={(e) => handleIdealPercentageChange(e, 'wants')}
        />
        <label htmlFor="savingsPercentage">Savings (%):</label>
        <input
          type="number"
          id="savingsPercentage"
          value={idealPercentages.savings}
          onChange={(e) => handleIdealPercentageChange(e, 'savings')}
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
      <div className="remaining-budget">
        <h2>Your Budget Corrections</h2>
        {expenses.needs !== null && (
          <p>Necessities: {getRemainingBudgetMessage('necessities', budgetData.remainingNecessitiesBudget)}</p>
        )}
        {expenses.wants !== null && (
          <p>Wants: {getRemainingBudgetMessage('wants', budgetData.remainingWantsBudget)}</p>
        )}
        {expenses.savings !== null && (
          <p>Savings: {getRemainingBudgetMessage('savings', budgetData.remainingSavingsBudget)}</p>
        )}
      </div>
      <button onClick={handleSave}>Save</button>
    </div>
  );
}

export default BudgetCalculator;
