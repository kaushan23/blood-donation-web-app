import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Profile.css';
import Navbar from '../components/Navbar';

const Profile = () => {
  const [userData, setUserData] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const storedUserData = JSON.parse(localStorage.getItem('userData'));
    if (!storedUserData) {
      navigate('/signin');
      return;
    }
    
    // Set default profile data based on user role
    const defaultUserData = {
      ...storedUserData,
      name: storedUserData.role === 'admin' ? 'Admin User' : 'John Doe',
      phone: storedUserData.role === 'admin' ? '+1 (555) 123-4567' : '+1 (555) 987-6543',
      address: storedUserData.role === 'admin' ? '123 Admin Street, Admin City, AC 12345' : '456 User Avenue, User City, UC 67890',
      dateOfBirth: storedUserData.role === 'admin' ? '1980-01-15' : '1990-05-20',
      bloodType: storedUserData.role === 'admin' ? 'O+' : 'A+',
      lastDonation: storedUserData.role === 'admin' ? 'N/A' : '2024-06-15',
      donationCount: storedUserData.role === 'admin' ? 0 : 12,
      medicalHistory: storedUserData.role === 'admin' ? 'None' : 'No major medical conditions'
    };

    setUserData(defaultUserData);
    setFormData(defaultUserData);
  }, [navigate]);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    setFormData(userData);
    setIsEditing(false);
  };

  const handleSave = () => {
    setUserData(formData);
    setIsEditing(false);
    // Update localStorage with new data
    localStorage.setItem('userData', JSON.stringify(formData));
    alert('Profile updated successfully!');
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  if (!userData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="profile-page">
      <Navbar />
      
      <div className="profile-container">
        <div className="profile-content">
          <div className="profile-header">
            <div className="profile-avatar">
              <div className="avatar-circle">
                {userData.name.charAt(0)}
              </div>
            </div>
            <div className="profile-info">
              <h1 className="profile-name">{userData.name}</h1>
              <p className="profile-role">{userData.role === 'admin' ? 'System Administrator' : 'Blood Donor'}</p>
              <span className={`role-badge ${userData.role.toLowerCase()}`}>
                {userData.role}
              </span>
            </div>
            <div className="profile-actions">
              {!isEditing ? (
                <button className="edit-btn" onClick={handleEdit}>
                  Edit Profile
                </button>
              ) : (
                <div className="edit-actions">
                  <button className="save-btn" onClick={handleSave}>
                    Save Changes
                  </button>
                  <button className="cancel-btn" onClick={handleCancel}>
                    Cancel
                  </button>
                </div>
              )}
            </div>
          </div>

          <div className="profile-sections">
            {/* Basic Information Section */}
            <div className="profile-section">
              <h2 className="section-title">Basic Information</h2>
              <div className="info-grid">
                <div className="info-item">
                  <label className="info-label">Full Name</label>
                  {isEditing ? (
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="info-input"
                    />
                  ) : (
                    <span className="info-value">{userData.name}</span>
                  )}
                </div>

                <div className="info-item">
                  <label className="info-label">Email Address</label>
                  {isEditing ? (
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="info-input"
                    />
                  ) : (
                    <span className="info-value">{userData.email}</span>
                  )}
                </div>

                <div className="info-item">
                  <label className="info-label">Phone Number</label>
                  {isEditing ? (
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="info-input"
                    />
                  ) : (
                    <span className="info-value">{userData.phone}</span>
                  )}
                </div>

                <div className="info-item">
                  <label className="info-label">Date of Birth</label>
                  {isEditing ? (
                    <input
                      type="date"
                      name="dateOfBirth"
                      value={formData.dateOfBirth}
                      onChange={handleChange}
                      className="info-input"
                    />
                  ) : (
                    <span className="info-value">{new Date(userData.dateOfBirth).toLocaleDateString()}</span>
                  )}
                </div>

                <div className="info-item full-width">
                  <label className="info-label">Address</label>
                  {isEditing ? (
                    <textarea
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      className="info-textarea"
                      rows="2"
                    />
                  ) : (
                    <span className="info-value">{userData.address}</span>
                  )}
                </div>
              </div>
            </div>

            {/* Medical Information Section - Only for regular users */}
            {userData.role !== 'admin' && (
              <div className="profile-section">
                <h2 className="section-title">Medical Information</h2>
                <div className="info-grid">
                  <div className="info-item">
                    <label className="info-label">Blood Type</label>
                    {isEditing ? (
                      <select
                        name="bloodType"
                        value={formData.bloodType}
                        onChange={handleChange}
                        className="info-select"
                      >
                        <option value="A+">A+</option>
                        <option value="A-">A-</option>
                        <option value="B+">B+</option>
                        <option value="B-">B-</option>
                        <option value="AB+">AB+</option>
                        <option value="AB-">AB-</option>
                        <option value="O+">O+</option>
                        <option value="O-">O-</option>
                      </select>
                    ) : (
                      <span className="info-value blood-type">{userData.bloodType}</span>
                    )}
                  </div>

                  <div className="info-item">
                    <label className="info-label">Last Donation</label>
                    <span className="info-value">{userData.lastDonation}</span>
                  </div>

                  <div className="info-item">
                    <label className="info-label">Total Donations</label>
                    <span className="info-value">{userData.donationCount}</span>
                  </div>

                  <div className="info-item full-width">
                    <label className="info-label">Medical History</label>
                    {isEditing ? (
                      <textarea
                        name="medicalHistory"
                        value={formData.medicalHistory}
                        onChange={handleChange}
                        className="info-textarea"
                        rows="3"
                      />
                    ) : (
                      <span className="info-value">{userData.medicalHistory}</span>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Admin Dashboard Section - Only for admins */}
            {userData.role === 'admin' && (
              <div className="profile-section">
                <h2 className="section-title">Admin Dashboard</h2>
                <div className="admin-stats">
                  <div className="stat-card">
                    <div className="stat-number">1,245</div>
                    <div className="stat-label">Total Donors</div>
                  </div>
                  <div className="stat-card">
                    <div className="stat-number">456</div>
                    <div className="stat-label">Active Campaigns</div>
                  </div>
                  <div className="stat-card">
                    <div className="stat-number">789</div>
                    <div className="stat-label">Blood Units</div>
                  </div>
                  <div className="stat-card">
                    <div className="stat-number">23</div>
                    <div className="stat-label">Urgent Requests</div>
                  </div>
                </div>
              </div>
            )}

            {/* Account Settings Section */}
            {/* <div className="profile-section">
              <h2 className="section-title">Account Settings</h2>
              <div className="settings-list">
                <div className="setting-item">
                  <div className="setting-info">
                    <h3>Email Notifications</h3>
                    <p>Receive notifications about donation opportunities and updates</p>
                  </div>
                  <label className="toggle-switch">
                    <input type="checkbox" defaultChecked />
                    <span className="toggle-slider"></span>
                  </label>
                </div>

                <div className="setting-item">
                  <div className="setting-info">
                    <h3>SMS Notifications</h3>
                    <p>Get text messages for urgent blood requests</p>
                  </div>
                  <label className="toggle-switch">
                    <input type="checkbox" />
                    <span className="toggle-slider"></span>
                  </label>
                </div>

                <div className="setting-item">
                  <div className="setting-info">
                    <h3>Privacy Settings</h3>
                    <p>Control who can see your donor information</p>
                  </div>
                  <select className="setting-select">
                    <option value="public">Public</option>
                    <option value="donors">Donors Only</option>
                    <option value="private">Private</option>
                  </select>
                </div>
              </div>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;