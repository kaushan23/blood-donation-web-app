import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import '../styles/RequestReport.css';

const RequestReport = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState(null);
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    // Get current user data
    const userData = JSON.parse(localStorage.getItem('userData'));
    setCurrentUser(userData);
    setUserRole(userData?.role);

    // Load requests based on user role
    if (userData?.role === 'admin') {
      loadAllRequests();
    } else {
      loadUserRequests(userData?.id || userData?.userId);
    }
  }, []);

  const loadAllRequests = () => {
    setLoading(true);
    
    // Admin sees all requests from all users
    const allRequests = JSON.parse(localStorage.getItem('bloodRequests')) || [];

    // If no requests exist, create some sample data with different users
    if (allRequests.length === 0) {
      const sampleRequests = [
        {
          id: 'REQ001',
          userId: 'user1',
          name: 'John Doe',
          location: 'General Hospital, Colombo',
          phoneNumber: '+94 77 123 4567',
          status: 'pending'
        },
        {
          id: 'REQ002',
          userId: 'user2',
          name: 'Jane Smith',
          location: 'Lanka Hospital, Colombo',
          phoneNumber: '+94 77 234 5678',
          status: 'approved'
        },
        {
          id: 'REQ003',
          userId: 'user3',
          name: 'Michael Johnson',
          location: 'Nawaloka Hospital, Colombo',
          phoneNumber: '+94 77 345 6789',
          status: 'not_available'
        },
        {
          id: 'REQ004',
          userId: 'user1',
          name: 'John Doe',
          location: 'Apollo Hospital, Colombo',
          phoneNumber: '+94 77 123 4567',
          status: 'pending'
        }
      ];

      localStorage.setItem('bloodRequests', JSON.stringify(sampleRequests));
      setRequests(sampleRequests);
    } else {
      setRequests(allRequests);
    }

    setLoading(false);
  };

  const loadUserRequests = (userId) => {
    setLoading(true);
    
    // Get requests from localStorage or create sample data
    const allRequests = JSON.parse(localStorage.getItem('bloodRequests')) || [];
    const userRequests = allRequests.filter(request => request.userId === userId);

    // If no requests exist, create some sample data
    if (userRequests.length === 0 && userId) {
      const sampleRequests = [
        {
          id: 'REQ001',
          userId: userId,
          name: currentUser?.name || 'John Doe',
          location: 'General Hospital, Colombo',
          phoneNumber: '+94 77 123 4567',
          status: 'approved'
        },
        {
          id: 'REQ002',
          userId: userId,
          name: currentUser?.name || 'John Doe',
          location: 'Lanka Hospital, Colombo',
          phoneNumber: '+94 77 123 4567',
          status: 'pending'
        },
        {
          id: 'REQ003',
          userId: userId,
          name: currentUser?.name || 'John Doe',
          location: 'Nawaloka Hospital, Colombo',
          phoneNumber: '+94 77 123 4567',
          status: 'not_available'
        }
      ];

      // Save sample requests to localStorage
      const updatedAllRequests = [...allRequests, ...sampleRequests];
      localStorage.setItem('bloodRequests', JSON.stringify(updatedAllRequests));
      setRequests(sampleRequests);
    } else {
      setRequests(userRequests);
    }

    setLoading(false);
  };

  const handleStatusChange = (requestId, newStatus) => {
    // Update the status of the request
    const updatedRequests = requests.map(request => 
      request.id === requestId 
        ? { ...request, status: newStatus }
        : request
    );

    setRequests(updatedRequests);

    // Update localStorage
    const allRequests = JSON.parse(localStorage.getItem('bloodRequests')) || [];
    const updatedAllRequests = allRequests.map(request =>
      request.id === requestId
        ? { ...request, status: newStatus }
        : request
    );
    localStorage.setItem('bloodRequests', JSON.stringify(updatedAllRequests));
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      approved: {
        className: 'status-available',
        text: 'Available'
      },
      not_available: {
        className: 'status-not-available',
        text: 'Not Available'
      },
      pending: {
        className: 'status-pending',
        text: 'Pending'
      }
    };

    const config = statusConfig[status] || statusConfig.pending;
    
    return (
      <span className={`status-badge ${config.className}`}>
        {config.text}
      </span>
    );
  };

  const getStatusDropdown = (request) => {
    // Only allow admin to select "Available" or "Not Available"
    return (
      <select 
        value={request.status === 'approved' ? 'approved' : (request.status === 'not_available' ? 'not_available' : 'pending')}
        onChange={(e) => handleStatusChange(request.id, e.target.value)}
        className="status-dropdown"
      >
        <option value="pending">Pending</option>
        <option value="approved">Available</option>
        <option value="not_available">Not Available</option>
      </select>
    );
  };

  if (loading) {
    return (
      <div className="request-report-page">
        <Navbar />
        <div className="loading-container">
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="request-report-page">
      <Navbar />
      <div className="request-report-container">
        <h1>{userRole === 'admin' ? 'All Blood Requests' : 'My Request Report'}</h1>
        
        {requests.length === 0 ? (
          <div className="no-requests">
            <p>No blood requests found.</p>
          </div>
        ) : (
          <div className="table-container">
            <table className="requests-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Location</th>
                  <th>Phone Number</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {requests.map((request) => (
                  <tr key={request.id}>
                    <td data-label="Name">{request.name}</td>
                    <td data-label="Location">{request.location}</td>
                    <td data-label="Phone Number">{request.phoneNumber}</td>
                    <td data-label="Status">
                      {userRole === 'admin'
                        ? getStatusDropdown(request)
                        : getStatusBadge(request.status)
                      }
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default RequestReport;