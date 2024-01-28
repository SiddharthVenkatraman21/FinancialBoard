import React, { useState } from 'react';
import BudgetCalculator from './budgetCalculator'; // Update the import
import BudgetGraph from './budgetGraph';
import './css/budgetPage.css'


function BudgetPage() {
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
    <div className="budget-page-container">
      <BudgetCalculator budgetData={budgetData} onInputChange={handleInputChange} />
      <BudgetGraph
        income={budgetData.income}
        needs={budgetData.expenses.needs}
        wants={budgetData.expenses.wants}
        savings={budgetData.expenses.savings}
      />
    </div>
  );
}

export default BudgetPage;
