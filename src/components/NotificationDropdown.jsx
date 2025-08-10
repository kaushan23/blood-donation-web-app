import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import bell from '../assets/nav_bar/bell-icon.png';
import '../styles/Navbar.css';

const NotificationDropdown = ({ userRole }) => {
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    loadNotifications();
    const interval = setInterval(() => {
      if (userRole === 'admin') {
        if (Math.random() > 0.95) addNewBloodRequest();
      } else {
        if (Math.random() > 0.98) addUserNotification();
      }
    }, 10000);
    return () => clearInterval(interval);
    // eslint-disable-next-line
  }, [userRole]);

  const loadNotifications = () => {
    const storageKey = userRole === 'admin' ? 'admin_notifications' : 'user_notifications';
    const storedNotifications = JSON.parse(localStorage.getItem(storageKey)) || [];
    if (storedNotifications.length === 0) {
      let sampleNotifications = [];
      if (userRole === 'admin') {
        sampleNotifications = getAdminSampleNotifications();
      } else {
        sampleNotifications = getUserSampleNotifications();
      }
      setNotifications(sampleNotifications);
      localStorage.setItem(storageKey, JSON.stringify(sampleNotifications));
    } else {
      setNotifications(storedNotifications);
    }
    const unread = storedNotifications.filter(notif => !notif.isRead).length;
    setUnreadCount(unread);
  };

  const getAdminSampleNotifications = () => [
    {
      id: 1,
      type: 'blood_request',
      bloodType: 'O-',
      location: 'City Hospital, Colombo',
      urgency: 'urgent',
      timestamp: new Date(Date.now() - 30 * 60 * 1000),
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
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
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
      timestamp: new Date(Date.now() - 45 * 60 * 1000),
      isRead: true,
      requesterName: 'Dr. Fernando',
      unitsNeeded: 3,
      reason: 'Critical patient care'
    }
  ];

  const getUserSampleNotifications = () => [
    {
      id: 2,
      type: 'request_status',
      requestId: 'REQ001',
      status: 'approved',
      bloodType: 'B+',
      unitsRequested: 2,
      unitsAvailable: 2,
      timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000),
      isRead: false,
      hospital: 'General Hospital, Colombo',
      message: 'Your blood request has been approved. Blood units are available for collection.'
    },
    {
      id: 3,
      type: 'request_status',
      requestId: 'REQ002',
      status: 'partial',
      bloodType: 'O-',
      unitsRequested: 3,
      unitsAvailable: 1,
      timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000),
      isRead: true,
      hospital: 'Lanka Hospital, Colombo',
      message: 'Your blood request is partially available. 1 out of 3 units ready for collection.'
    }
  ];

  const addNewBloodRequest = () => {
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

    const updatedNotifications = [newNotification, ...notifications].slice(0, 10);
    setNotifications(updatedNotifications);
    setUnreadCount(prev => prev + 1);
    localStorage.setItem('admin_notifications', JSON.stringify(updatedNotifications));
  };

  const addUserNotification = () => {
    const notificationTypes = ['donation_reminder', 'request_status'];
    const type = notificationTypes[Math.floor(Math.random() * notificationTypes.length)];
    let newNotification;
    if (type === 'donation_reminder') {
      const storageKey = 'user_notifications';
      const storedNotifs = JSON.parse(localStorage.getItem(storageKey)) || [];
      const alreadyExists = notifications.some(n => n.type === 'donation_reminder') ||
                            storedNotifs.some(n => n.type === 'donation_reminder');
      if (alreadyExists) return;
      newNotification = {
        id: Date.now(),
        type: 'donation_reminder',
        timestamp: new Date(),
        isRead: false,
        nextDonationDate: new Date(Date.now() + Math.floor(Math.random() * 30) * 24 * 60 * 60 * 1000),
        message: 'You are eligible to donate blood again!'
      };
    } else {
      const statuses = ['approved', 'partial', 'rejected'];
      const bloodTypes = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];
      const hospitals = ['General Hospital, Colombo', 'Lanka Hospital, Colombo', 'Nawaloka Hospital, Colombo'];
      const status = statuses[Math.floor(Math.random() * statuses.length)];
      const unitsRequested = Math.floor(Math.random() * 3) + 1;
      newNotification = {
        id: Date.now(),
        type: 'request_status',
        requestId: `REQ${Math.floor(Math.random() * 1000).toString().padStart(3, '0')}`,
        status: status,
        bloodType: bloodTypes[Math.floor(Math.random() * bloodTypes.length)],
        unitsRequested: unitsRequested,
        unitsAvailable: status === 'approved' ? unitsRequested : (status === 'partial' ? Math.floor(unitsRequested / 2) : 0),
        timestamp: new Date(),
        isRead: false,
        hospital: hospitals[Math.floor(Math.random() * hospitals.length)],
        message: getStatusMessage(status)
      };
    }
    const updatedNotifications = [newNotification, ...notifications].slice(0, 10);
    setNotifications(updatedNotifications);
    setUnreadCount(prev => prev + 1);
    localStorage.setItem('user_notifications', JSON.stringify(updatedNotifications));
  };

  const getStatusMessage = (status) => {
    switch (status) {
      case 'approved':
        return 'Your blood request has been approved. Blood units are available for collection.';
      case 'partial':
        return 'Your blood request is partially available. Some units are ready for collection.';
      case 'rejected':
        return 'Your blood request could not be fulfilled at this time. Please try again later.';
      default:
        return 'Blood request status updated.';
    }
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

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const getUrgencyClass = (urgency) => {
    switch (urgency) {
      case 'critical': return 'critical';
      case 'urgent': return 'urgent';
      default: return 'normal';
    }
  };

//   const getStatusClass = (status) => {
//     switch (status) {
//       case 'approved': return 'approved';
//       case 'partial': return 'partial';
//       case 'rejected': return 'rejected';
//       default: return 'normal';
//     }
//   };

  const toggleNotifications = () => {
    setIsNotificationOpen(!isNotificationOpen);
    if (!isNotificationOpen) {
      const updatedNotifications = notifications.map(notif => ({
        ...notif,
        isRead: true
      }));
      setNotifications(updatedNotifications);
      setUnreadCount(0);
      const storageKey = userRole === 'admin' ? 'admin_notifications' : 'user_notifications';
      localStorage.setItem(storageKey, JSON.stringify(updatedNotifications));
    }
  };

  const clearAllNotifications = () => {
    setNotifications([]);
    setUnreadCount(0);
    const storageKey = userRole === 'admin' ? 'admin_notifications' : 'user_notifications';
    localStorage.setItem(storageKey, JSON.stringify([]));
    setIsNotificationOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest('.notification-container')) {
        setIsNotificationOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const renderNotificationContent = (notification) => {
    if (userRole === 'admin' && notification.type === 'blood_request') {
      return (
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
      );
    } else if (userRole !== 'admin') {
      if (notification.type === 'donation_reminder') {
        return (
          <div className="notification-content">
            <div className="notification-main">
              <div className="donation-icon">
                🩸
              </div>
              <div className="notification-details">
                <div className="notification-title">
                  Ready to Donate Again!
                </div>
                <div className="notification-info">
                  <div className="donation-date">📅 Available from: {formatDate(notification.nextDonationDate)}</div>
                  <div className="details">{notification.message}</div>
                  <div className="call-to-action">Contact us to schedule your donation</div>
                </div>
              </div>
            </div>
            <div className="notification-time">
              {formatTimeAgo(notification.timestamp)}
            </div>
          </div>
        );
      }
    }
    return null;
  };

  const getNotificationHeaderTitle = () => {
    return userRole === 'admin' ? 'Blood Requests' : 'Notifications';
  };

  // Filter notifications for user to only show the specific donation reminder
  const getFilteredNotifications = () => {
    if (userRole !== 'admin') {
      return notifications.filter(
        n =>
          n.type === 'donation_reminder' &&
          n.message === 'You are eligible to donate blood again!'
      );
    }
    return notifications;
  };

  return (
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
            <h3>{getNotificationHeaderTitle()}</h3>
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
            {getFilteredNotifications().length === 0 ? (
              <div className="no-notifications">
                <p>{userRole === 'admin' ? 'No blood requests at the moment' : 'No notifications at the moment'}</p>
              </div>
            ) : (
              getFilteredNotifications().map((notification) => (
                <div 
                  key={notification.id} 
                  className={`notification-item ${
                    userRole === 'admin' 
                      ? getUrgencyClass(notification.urgency) 
                      : 'donation-reminder'
                  } ${!notification.isRead ? 'unread' : ''}`}
                >
                  {renderNotificationContent(notification)}
                </div>
              ))
            )}
          </div>
          {notifications.length > 0 && userRole === 'admin' && (
            <div className="notification-footer">
              <Link to="/blood-requests" className="view-all-btn">
                View All Requests
              </Link>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default NotificationDropdown;
