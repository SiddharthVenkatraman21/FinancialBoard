import React from 'react';
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
  
  return (
    <Router>
      <div className="mainBody">
          <Navbar />
          <Routes>
              <Route path="/"  element={<Dashboard/>}/>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/reset" element={<Reset />} />
              <Route path="/compare" element={<CompareView/>} />
              <Route path="/recommendation" element={<AnalysisPage/>} />
              <Route path="/budget" element={<BudgetPage/>} />
              <Route path="/credit" element={<CreditPage/>} />
              <Route path="/savingsPage" element={<sSavingsPage/>} />
              {/* <Route path="/contacts" element={<Contacts/>} />
              <Route path="/map" element={<Map/>} /> */}
          </Routes>

          {/* <Footer /> */}
      </div>
    </Router>
  );
}
export default App;
