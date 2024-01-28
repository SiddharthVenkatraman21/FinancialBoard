import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import StockQuote from './components/stockQuote';
import BudgetCalculator from './components/budgetCalculator'; 
import CompanyNewsContainer from './components/CompanyNewsContainer';
import StockNewsContainer from './components/stockNewsContainer';
import RecommendationWidget from './components/recomendationChart';
import Navbar from './components/navbar'
import CompareView from './components/compareview'

function App() {
  return (
    <Router>
      <div className="mainBody">
          {/* <Countdown /> */}
          <Navbar />

          <Routes>
              <Route path="/" element={<CompareView/>} />
              <Route path="/prices" element={<RecommendationWidget/>} />
              {/* <Route path="/contacts" element={<Contacts/>} />
              <Route path="/map" element={<Map/>} /> */}
          </Routes>

          {/* <Footer /> */}
      </div>
    </Router>
  );
}

export default App;
