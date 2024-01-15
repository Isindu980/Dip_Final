import React, { useState, useEffect } from 'react';
import './Navbar.css';


const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

 

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <nav className="navbar">
        <div className="desktop-logo">
          volunT
        </div>
        <div className="menu-icon" onClick={toggleMenu}>
          {isOpen ? 'Close' : 'Menu'}
        </div>
        <ul id="navbar" className={isOpen ? 'navbar-open' : ''} onClick={() => setIsOpen(false)}>
          <li><a href="/" className="active"><i className="fa-solid fa-house "></i> Home</a></li>
          <li><a href="/about"><i className="fa-solid fa-address-card "></i> About Us</a></li>
          <li><a href="/service"><i className="fa-brands fa-servicestack "></i> Services</a></li>
          <li><a href="/calendar"><i className="fa-solid fa-calendar-days "></i> Calendar</a></li>
          <li><a href="/contact"><i className="fa-solid fa-address-book "></i> Contact Us</a></li>
        
          
          

        </ul>
      </nav>
    </div>
  );
};

export default Navbar;
