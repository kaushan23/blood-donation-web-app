import React, { useState, useEffect } from 'react';
import './Navbar.css';
import logo from '../assets/logo.png';
import { Link, useNavigate } from 'react-router-dom';
import bell from '../assets/nav_bar/bell-icon.png'
import dropdown from '../assets/nav_bar/dropdown-icon.png'

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const navigate = useNavigate();
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('userData'));
    console.log('User Data:', userData);
    if (userData && userData.role) {
      setUserRole(userData.role);
    }

    // Load notifications from localStorage or initialize with sample data
    loadNotifications();
    
    // Simulate receiving new notifications (in real app, this would be from API/WebSocket)
    const interval = setInterval(() => {
      // Randomly add new blood request notifications for demo
      if (Math.random() > 0.95) { // Very low chance to avoid spam
        addNewNotification();
      }
    }, 10000); // Check every 10 seconds

    return () => clearInterval(interval);
  }, []);

  const loadNotifications = () => {
    const storedNotifications = JSON.parse(localStorage.getItem('notifications')) || [];
    
    // If no stored notifications, add some sample ones
    if (storedNotifications.length === 0) {
      const sampleNotifications = [
        {
          id: 1,
          type: 'blood_request',
          bloodType: 'O-',
          location: 'City Hospital, Colombo',
          urgency: 'urgent',
          timestamp: new Date(Date.now() - 30 * 60 * 1000), // 30 minutes ago
          isRead: false,
          requesterName: 'Dr. Silva',
          unitsNeeded: 2,
          reason: 'Emergency surgery'
        },
        {
          id: 2,
          type: 'blood_request',
          bloodType: 'A+',
          location: 'National Hospital, Kandy',
          urgency: 'normal',
          timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
          isRead: false,
          requesterName: 'Dr. Perera',
          unitsNeeded: 1,
          reason: 'Planned surgery'
        },
        {
          id: 3,
          type: 'blood_request',
          bloodType: 'B+',
          location: 'Teaching Hospital, Galle',
          urgency: 'critical',
          timestamp: new Date(Date.now() - 45 * 60 * 1000), // 45 minutes ago
          isRead: true,
          requesterName: 'Dr. Fernando',
          unitsNeeded: 3,
          reason: 'Critical patient care'
        }
      ];
      
      setNotifications(sampleNotifications);
      localStorage.setItem('notifications', JSON.stringify(sampleNotifications));
    } else {
      setNotifications(storedNotifications);
    }
    
    // Count unread notifications
    const unread = storedNotifications.filter(notif => !notif.isRead).length;
    setUnreadCount(unread);
  };

  const addNewNotification = () => {
    const bloodTypes = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];
    const locations = ['General Hospital, Colombo', 'Lanka Hospital, Colombo', 'Nawaloka Hospital, Colombo', 'Apollo Hospital, Colombo'];
    const urgencies = ['normal', 'urgent', 'critical'];
    const doctors = ['Dr. Wijesinghe', 'Dr. Rajapaksa', 'Dr. Gunawardena', 'Dr. Jayawardena'];
    const reasons = ['Emergency surgery', 'Accident victim', 'Cancer treatment', 'Planned surgery', 'Blood loss'];

    const newNotification = {
      id: Date.now(),
      type: 'blood_request',
      bloodType: bloodTypes[Math.floor(Math.random() * bloodTypes.length)],
      location: locations[Math.floor(Math.random() * locations.length)],
      urgency: urgencies[Math.floor(Math.random() * urgencies.length)],
      timestamp: new Date(),
      isRead: false,
      requesterName: doctors[Math.floor(Math.random() * doctors.length)],
      unitsNeeded: Math.floor(Math.random() * 3) + 1,
      reason: reasons[Math.floor(Math.random() * reasons.length)]
    };

    const updatedNotifications = [newNotification, ...notifications].slice(0, 10); // Keep only latest 10
    setNotifications(updatedNotifications);
    setUnreadCount(prev => prev + 1);
    localStorage.setItem('notifications', JSON.stringify(updatedNotifications));
  };

  const formatTimeAgo = (timestamp) => {
    const now = new Date();
    const time = new Date(timestamp);
    const diffInMinutes = Math.floor((now - time) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
    return `${Math.floor(diffInMinutes / 1440)}d ago`;
  };

  const getUrgencyClass = (urgency) => {
    switch (urgency) {
      case 'critical': return 'critical';
      case 'urgent': return 'urgent';
      default: return 'normal';
    }
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleProfileDropdown = () => {
    setIsProfileDropdownOpen(!isProfileDropdownOpen);
  };

  const toggleNotifications = () => {
    setIsNotificationOpen(!isNotificationOpen);
    
    // Mark all notifications as read when opened
    if (!isNotificationOpen) {
      const updatedNotifications = notifications.map(notif => ({
        ...notif,
        isRead: true
      }));
      setNotifications(updatedNotifications);
      setUnreadCount(0);
      localStorage.setItem('notifications', JSON.stringify(updatedNotifications));
    }
  };

  const clearAllNotifications = () => {
    setNotifications([]);
    setUnreadCount(0);
    localStorage.setItem('notifications', JSON.stringify([]));
    setIsNotificationOpen(false);
  };

  const handleLogout = () => {
    setIsProfileDropdownOpen(false);
    navigate('/');
  };

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest('.profile-dropdown-container')) {
        setIsProfileDropdownOpen(false);
      }
      if (!event.target.closest('.notification-container')) {
        setIsNotificationOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <nav className="custom-navbar">
      <div className="nav-container">
        <div className="nav-logo">
          <img src={logo} alt="LifeLink Logo" />
        </div>
        <div className="nav-items">
          <div className={`nav-menu ${isMenuOpen ? 'active' : ''}`}>
            <Link to="/home" className="nav-link">Home</Link>
            {userRole === 'ADMIN' && (
              <Link to="/stocks" className="nav-link">Stocks</Link>
            )}               
            <Link to="/about" className="nav-link">About Us</Link>
            <Link to="/donor-list" className="nav-link">Donor List</Link>
            <Link to="/search-donor" className="nav-link">Search Donor</Link>
            <Link to="/camps" className="nav-link">Camps</Link>
          </div>
          
          {/* Notification Bell */}
          <div className="notification-container">
            <button 
              className={`notification-btn ${unreadCount > 0 ? 'has-notifications' : ''}`}
              onClick={toggleNotifications}
            >
              <img src={bell} alt="bell icon" className="bell-icon"/>
              {unreadCount > 0 && (
                <span className="notification-badge">{unreadCount > 99 ? '99+' : unreadCount}</span>
              )}
            </button>

            {isNotificationOpen && (
              <div className="notification-dropdown">
                <div className="notification-header">
                  <h3>Blood Requests</h3>
                  {notifications.length > 0 && (
                    <button 
                      className="clear-btn"
                      onClick={clearAllNotifications}
                    >
                      Clear All
                    </button>
                  )}
                </div>

                <div className="notification-list">
                  {notifications.length === 0 ? (
                    <div className="no-notifications">
                      <p>No blood requests at the moment</p>
                    </div>
                  ) : (
                    notifications.map((notification) => (
                      <div 
                        key={notification.id} 
                        className={`notification-item ${getUrgencyClass(notification.urgency)} ${!notification.isRead ? 'unread' : ''}`}
                      >
                        <div className="notification-content">
                          <div className="notification-main">
                            <div className="blood-type-badge">
                              {notification.bloodType}
                            </div>
                            <div className="notification-details">
                              <div className="notification-title">
                                {notification.urgency === 'critical' && '🚨 '}
                                {notification.urgency === 'urgent' && '⚠️ '}
                                Blood Request - {notification.bloodType}
                              </div>
                              <div className="notification-info">
                                <div className="location">📍 {notification.location}</div>
                                <div className="requester">👨‍⚕️ {notification.requesterName}</div>
                                <div className="details">
                                  {notification.unitsNeeded} unit{notification.unitsNeeded > 1 ? 's' : ''} needed • {notification.reason}
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="notification-time">
                            {formatTimeAgo(notification.timestamp)}
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>

                {notifications.length > 0 && (
                  <div className="notification-footer">
                    <Link to="/blood-requests" className="view-all-btn">
                      View All Requests
                    </Link>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Profile Dropdown */}
          <div className="profile-dropdown-container">
            <button 
              className="profile-btn"
              onClick={toggleProfileDropdown}
            >
              My Profile                
              <img src={dropdown} alt="dropdown-icon" className={`drop-icon ${isProfileDropdownOpen ? 'open' : ''}`}
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
                <Link to="/cpassword" className="dropdown-item" onClick={() => setIsProfileDropdownOpen(false)}>
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