import React, { useState, useEffect } from 'react';
import './Navbar.css';
import logo from '../assets/logo.png';
import { Link, useNavigate } from 'react-router-dom';
import bell from '../assets/nav_bar/bell-icon.png'
import dropdown from '../assets/nav_bar/dropdown-icon.png'

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const [userRole, setUserRole] = useState(null);

useEffect(() => {
  const userData = JSON.parse(localStorage.getItem('userData'));
  console.log('User Data:', userData);
  if (userData && userData.role) {
    setUserRole(userData.role);
  }
}, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleProfileDropdown = () => {
    setIsProfileDropdownOpen(!isProfileDropdownOpen);
  };

  const handleLogout = () => {
    // Handle logout logic here
    setIsProfileDropdownOpen(false);
    navigate('/');
  };

  return (
    <nav className="custom-navbar">
      <div className="nav-container">
        <div className="nav-logo">
          <img src={logo} alt="LifeLink Logo" />
        </div>
        <div className="nav-items">
          <div className={`nav-menu ${isMenuOpen ? 'active' : ''}`}>
            <Link to="/home" className="nav-link">Home</Link>
            {userRole == 'ADMIN' && (
              <Link to="/stocks" className="nav-link">Stocks</Link>
            )}               
            <Link to="/about" className="nav-link">About Us</Link>
            <Link to="/donor-list" className="nav-link">Donor List</Link>
            <Link to="/search-donor" className="nav-link">Search Donor</Link>
            <Link to="/camps" className="nav-link">Camps</Link>
                                
          </div>
          
          {/* Show different buttons based on admin status */}
            <img src= {bell} alt="bell icon"/>
            <div className="profile-dropdown-container">
              <button 
                className="profile-btn"
                onClick={toggleProfileDropdown}
              >
                My Profile                
                <img src= {dropdown} alt="dropdown-icon" className={`drop-icon ${isProfileDropdownOpen ? 'open' : ''}`}
                  width="12" 
                  height="8" 
                  viewBox="0 0 12 8"                  
                  fill="none"/>
                  <path d="M1 1L6 6L11 1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>               
              </button>

              {isProfileDropdownOpen && (
                <div className="profile-dropdown">
                  <Link to="/profile" className="dropdown-item" onClick={() => setIsProfileDropdownOpen(false)}>
                    Profile
                  </Link>
                  <Link to="/change-password" className="dropdown-item" onClick={() => setIsProfileDropdownOpen(false)}>
                    Change Password
                  </Link>          
                  <button className="dropdown-item logout-item" onClick={handleLogout}>
                    Logout
                  </button>
                </div>
              )}
            </div>
        </div>
        <div className={`hamburger ${isMenuOpen ? 'active' : ''}`} onClick={toggleMenu}>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;