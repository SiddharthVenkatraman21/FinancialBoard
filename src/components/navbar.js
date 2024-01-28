import React from 'react'
import { Link } from 'react-router-dom'
import './css/Navbar.css'

const Navbar = () => {
  return (
    <div>
        <nav className='navbar'>
            <ul className='nav-list'>
                <li className='nav-item'><Link to="/" className='nav-link'>Home</Link></li>
                <li className='nav-item'><Link to="/compare" className='nav-link'>Compare</Link></li>
                <li className='nav-item'><Link to="/recommendation" className='nav-link'>Recomendations</Link></li>
                <li className='nav-item'><Link to="/budget" className='nav-link'>Budget</Link></li>
                <li className='nav-item'><Link to="/credit" className='nav-link'>Credit</Link></li>
                <li className='nav-item'><Link to="/savings" className='nav-link'>Savings</Link></li>
                {/* <li className='nav-item'><Link to="/contacts" className='nav-link'>Contacts</Link></li>
                <li className='nav-item'><Link to="/map" className='nav-link'>Map</Link></li> */}
            </ul>
        </nav>
    </div>
  )
}

export default Navbar