// BudgetCalculator.js
import React, { useState, useEffect } from 'react';
import './css/budgetCalculator.css'; // Add your CSS file path
import BudgetGraph from './budgetGraph'; // Import BudgetGraph component
import { serverTimestamp, collection, addDoc, arrayUnion, doc, updateDoc } from "./firebase";
import { useUser } from '../UserContext';
import { db, query, where, getDocs } from './firebase';

function BudgetCalculator({ initialBudgetData, onInputChange }) {
  const { uid } = useUser();
  const [income, setIncome] = useState(0);
  const [expenses, setExpenses] = useState({
    needs: 0,
    wants: 0,
    savings: 0,
  });
  const [idealPercentages, setIdealPercentages] = useState({
    necessities: 50,
    wants: 30,
    savings: 20,
  });
  const [selectedMonth, setSelectedMonth] = useState(1);
  const [selectedYear, setSelectedYear] = useState(2024);

  const handleIncomeChange = (event) => {
    const value = parseFloat(event.target.value) || 0;
    setIncome(value);
  };

  const handleExpenseChange = (event, category) => {
    const value = parseFloat(event.target.value) || 0;
    setExpenses((prevExpenses) => ({
      ...prevExpenses,
      [category]: value,
    }));
  };

  const handleIdealPercentageChange = (event, category) => {
    const value = parseFloat(event.target.value) || 0;
    setIdealPercentages((prevPercentages) => ({
      ...prevPercentages,
      [category]: value,
    }));
  };

  useEffect(() => {
    // Update the parent state whenever there's a change in the input fields
    onInputChange({
      income,
      expenses,
      idealPercentages,
    });
  }, [income, expenses, idealPercentages, onInputChange]);

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

  const handleMonthlySubmit = async () => {
    // add MM:YYYY and monthly income vals to collection
    if (!uid) {
      console.log("User is not logged in");
      return;
    }
    const userId = uid;

    // finding documentID
    const collectionRef = collection(db,"users");
    const q = query(collectionRef,where("uid") == uid);

    const querySnapshot = await getDocs(q);
    const documentId = querySnapshot.docs[0].id;

    let date = Date.now();
    if(selectedMonth < 10) {
      let date = Date.parse(selectedYear+"-0"+selectedMonth+"-01");
    } else {
      let date = Date.parse(selectedYear+"-"+selectedMonth+"-01");
    }

    try {
      const userDocRef = doc(db, "users",documentId);
      const expenses_sum = expenses.needs+expenses.wants;

      await updateDoc(userDocRef, {
        months_recorded: arrayUnion(date),
        monthly_income: arrayUnion(income),
        monthly_necessities: arrayUnion(expenses.needs),
        monthly_wants: arrayUnion(expenses.wants),
        monthly_savings: arrayUnion(expenses.savings),
        monthly_total_expenses: arrayUnion(expenses_sum),
      });
      console.log("User info updated!");
    } catch (e) {
      console.error("Error updating user info: ", e);
    }

  };

  // Render BudgetCalculator content
  return (
    <div className="budget-calculator-container">
      <h1>Budget Calculator</h1>
      <div>
        <h2> </h2>
        <label htmlFor="monthSelect">Month:</label>
        <select
          id="monthSelect"
          value={selectedMonth}
          onChange={(e) => setSelectedMonth(parseInt(e.target.value))}
          style={{textAlign:'center'}}
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
        <label htmlFor="yearSelect">            Year:</label>
        <select
          id="yearSelect"
          value={selectedYear}
          onChange={(e) => setSelectedYear(parseInt(e.target.value))}
          style={{textAlign:'center'}}
        >
          {Array.from({ length: 101 }, (_, i) => 1950 + i).map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
      </div>
      <div>
        <h2> </h2>
        <label htmlFor="incomeInput">Monthly Income:</label>
        <input
          type="number"
          id="incomeInput"
          value={income}
          onChange={handleIncomeChange}
        />
      </div>
      <div>
        <h2>Budget Planning</h2>
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
        <h2>Actual Spending</h2>
        <label htmlFor="needsInput">Needs:</label>
        <input
          type="number"
          id="needsInput"
          value={expenses.needs}
          onChange={(e) => handleExpenseChange(e, 'needs')}
        />
      </div>
      <div>
        <label htmlFor="wantsInput">Wants:</label>
        <input
          type="number"
          id="wantsInput"
          value={expenses.wants}
          onChange={(e) => handleExpenseChange(e, 'wants')}
        />
      </div>
      <div>
        <label htmlFor="savingsInput">Savings/Debt Repayments:</label>
        <input
          type="number"
          id="savingsInput"
          value={expenses.savings}
          onChange={(e) => handleExpenseChange(e, 'savings')}
        />
      </div>
      <div>
        <button style={{marginTop:'10px', width:'100px', marginBottom:'10px'}} className="budgetButton" onClick={handleMonthlySubmit}>Save</button>
      </div>
      <div className="remaining-budget">
        <h2>Budget Success</h2>
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
      {/* BudgetGraph is not rendered here */}
    </div>
  );
}

export default BudgetCalculator;
