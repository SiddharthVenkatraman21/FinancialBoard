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
          <li className='nav-item'><NavLink exact to="/" className='nav-link' activeClassName='active-link'>Home</NavLink></li>
          <li className='nav-item'><NavLink to="/compare" className='nav-link' activeClassName='active-link'>Compare</NavLink></li>
          <li className='nav-item'><NavLink to="/recommendation" className='nav-link' activeClassName='active-link'>Recommendations</NavLink></li>
          <li className='nav-item'><NavLink to="/budget" className='nav-link' activeClassName='active-link'>Budget</NavLink></li>
          <li className='nav-item'><NavLink to="/credit" className='nav-link' activeClassName='active-link'>Credit</NavLink></li>
          <li className='nav-item'><NavLink to="/login" className='nav-link' activeClassName='active-link'>Login</NavLink></li>
          {/* <li className='nav-item'><NavLink to="/contacts" className='nav-link' activeClassName='active-link'>Contacts</NavLink></li>
          <li className='nav-item'><NavLink to="/map" className='nav-link' activeClassName='active-link'>Map</NavLink></li> */}
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;
