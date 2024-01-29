import React from 'react';
import { NavLink } from 'react-router-dom';
import './css/Navbar.css';

const Navbar = () => {
  return (
    <div>
      <nav className='navbar'>
        <ul className='nav-list'>
          {/* Login link positioned to the far left */}
          {/* Existing navigation links */}
          <li className='nav-item'><NavLink exact to="/FinancialBoard/" className='nav-link' activeClassName='active-link'>Home</NavLink></li>
          <li className='nav-item'><NavLink to="/FinancialBoard/compare" className='nav-link' activeClassName='active-link'>Compare</NavLink></li>
          <li className='nav-item'><NavLink to="/FinancialBoard/recommendation" className='nav-link' activeClassName='active-link'>Recommendations</NavLink></li>
          <li className='nav-item'><NavLink to="/FinancialBoard/budget" className='nav-link' activeClassName='active-link'>Budget</NavLink></li>
          <li className='nav-item'><NavLink to="/FinancialBoard/credit" className='nav-link' activeClassName='active-link'>Credit</NavLink></li>
          <li className='nav-item'><NavLink to="/FinancialBoard/login" className='nav-link' activeClassName='active-link'>Login</NavLink></li>
          {/* <li className='nav-item'><NavLink to="/contacts" className='nav-link' activeClassName='active-link'>Contacts</NavLink></li>
          <li className='nav-item'><NavLink to="/map" className='nav-link' activeClassName='active-link'>Map</NavLink></li> */}
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;
