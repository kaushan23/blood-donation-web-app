import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/RegisterPage.css';
import logo from '../assets/logo.png'; 

const RegisterPage = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    dateOfBirth: '',
    address: '',
    bloodType: '',
    medicalHistory: '',
    password: '',
    confirmPassword: '',
    role: 'USER' // Default role
  });
  
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleNextStep = (e) => {
    e.preventDefault();
    
    // Validate Step 1 fields
    if (!formData.name || !formData.email || !formData.phone || !formData.dateOfBirth) {
      alert('Please fill in all required fields!');
      return;
    }

    // Email validation
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(formData.email)) {
      alert('Please enter a valid email address!');
      return;
    }

    setCurrentStep(2);
  };

  const handlePrevStep = () => {
    setCurrentStep(1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate Step 2 fields
    if (!formData.address || !formData.bloodType || !formData.password || !formData.confirmPassword) {
      alert('Please fill in all required fields!');
      return;
    }

    // Password validation
    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match!');
      return;
    }

    if (formData.password.length < 6) {
      alert('Password must be at least 6 characters long!');
      return;
    }

    // Store user data in localStorage
    const userData = {
      ...formData,
      id: Date.now(), // Simple ID generation
      donationCount: 0,
      lastDonation: 'N/A'
    };

    localStorage.setItem('userData', JSON.stringify(userData));
    alert('Registration successful!');
    navigate('/signin');
  };

  return (
    <div className="register-page">
      <div className="register-container">
        <div className="register-header">
          <img src= {logo} alt="Logo" className="register-logo" />
        </div>

        <div className="register-content">
          <div className="register-card">
            <div className="register-image-section">
              <div className="image-content">
                <img src="" alt="" className="register-hero-image" />
              </div>
            </div>

            <div className="register-form-section">
              {/* Step Indicator */}
              <div className="step-indicator">
                <div className={`step ${currentStep >= 1 ? 'active' : ''}`}>
                  <span className="step-number">1</span>
                  <span className="step-text">Basic Info</span>
                </div>
                <div className="step-line"></div>
                <div className={`step ${currentStep >= 2 ? 'active' : ''}`}>
                  <span className="step-number">2</span>
                  <span className="step-text">Complete</span>
                </div>
              </div>

              <h1 className="register-title">
                {currentStep === 1 ? 'Create Account' : 'Complete Registration'}
              </h1>
              <p className="register-subtitle">
                {currentStep === 1 
                  ? 'Join our community and help save lives through blood donation'
                  : 'Just a few more details to complete your registration'
                }
              </p>

              {/* Step 1: Basic Information */}
              {currentStep === 1 && (
                <form className="register-form" onSubmit={handleNextStep}>
                  <div className="form-row">
                    <div className="form-group">
                      <label className="form-label">Full Name *</label>
                      <input
                        type="text"
                        name="name"
                        className="form-input"
                        placeholder="Enter your full name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    <div className="form-group">
                      <label className="form-label">Email Address *</label>
                      <input
                        type="email"
                        name="email"
                        className="form-input"
                        placeholder="Enter your email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label className="form-label">Phone Number *</label>
                      <input
                        type="tel"
                        name="phone"
                        className="form-input"
                        placeholder="Enter your phone number"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    <div className="form-group">
                      <label className="form-label">Date of Birth *</label>
                      <input
                        type="date"
                        name="dateOfBirth"
                        className="form-input"
                        value={formData.dateOfBirth}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>

                  <button type="submit" className="register-button">
                    Continue to Next Step
                  </button>
                </form>
              )}

              {/* Step 2: Additional Details */}
              {currentStep === 2 && (
                <form className="register-form" onSubmit={handleSubmit}>
                  <div className="form-group">
                    <label className="form-label">Address *</label>
                    <textarea
                      name="address"
                      className="form-textarea"
                      placeholder="Enter your full address"
                      value={formData.address}
                      onChange={handleChange}
                      rows="2"
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Blood Type *</label>
                    <select
                      name="bloodType"
                      className="form-select"
                      value={formData.bloodType}
                      onChange={handleChange}
                      required
                    >
                      <option value="">Select your blood type</option>
                      <option value="A+">A+</option>
                      <option value="A-">A-</option>
                      <option value="B+">B+</option>
                      <option value="B-">B-</option>
                      <option value="AB+">AB+</option>
                      <option value="AB-">AB-</option>
                      <option value="O+">O+</option>
                      <option value="O-">O-</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label className="form-label">Medical History</label>
                    <textarea
                      name="medicalHistory"
                      className="form-textarea"
                      placeholder="Enter any relevant medical history (optional)"
                      value={formData.medicalHistory}
                      onChange={handleChange}
                      rows="2"
                    />
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label className="form-label">Password *</label>
                      <input
                        type="password"
                        name="password"
                        className="form-input"
                        placeholder="Create a password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                        minLength="6"
                      />
                    </div>

                    <div className="form-group">
                      <label className="form-label">Confirm Password *</label>
                      <input
                        type="password"
                        name="confirmPassword"
                        className="form-input"
                        placeholder="Confirm your password"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        required
                        minLength="6"
                      />
                    </div>
                  </div>

                  <div className="form-buttons">
                    <button type="button" className="back-button" onClick={handlePrevStep}>
                      Back
                    </button>
                    <button type="submit" className="register-button">
                      Create Account
                    </button>
                  </div>
                </form>
              )}

              <div className="register-footer">
                <p className="login-prompt">
                  Already have an account?{' '}
                  <Link to="/" className="login-link">
                    Sign In
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;