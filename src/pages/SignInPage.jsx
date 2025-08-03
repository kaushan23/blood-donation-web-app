import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/SignInPage.css';
import logo from '../assets/logo-icon.png'; 
import signin from '../assets/SignIn-Register/signin.jpg'; 

const SignInPage = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  // Hardcoded credentials
  const adminCredentials = {
    email: 'admin@example.com',
    password: 'admin123',
    role: 'ADMIN'
  };

  const userCredentials = {
    email: 'user@example.com',
    password: 'user123',
    role: 'USER'
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const { email, password } = formData;

    // Admin login check
    if (email === adminCredentials.email && password === adminCredentials.password) {
      localStorage.setItem('userData', JSON.stringify(adminCredentials));
      navigate('/home'); // Redirect to admin interface
    } 
    // User login check
    else if (email === userCredentials.email && password === userCredentials.password) {
      localStorage.setItem('userData', JSON.stringify(userCredentials));
      navigate('/home'); // Redirect to user interface
    } 
    // Invalid login
    else {
      alert('Invalid email or password');
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="signin-page">
      <div className="signin-container">
        <div className="signin-header">
          <img 
            src={logo}
            alt="Blood donation logo" 
            className="signin-logo"/>
          <span className="signin-brand">LifeLink</span>
        </div>

        <div className="signin-content">
          <div className="signin-card">
            <div className="signin-image-section">
              <div className="image-content">
                <img 
                  src= {signin}
                  alt="Medical professionals"
                  className="signin-hero-image"
                />
              </div>
            </div>

            <div className="signin-form-section">
              <h1 className="signin-title">Welcome Back</h1>
              <p className="signin-subtitle">Sign in to your account to continue helping save lives</p>

              <form className="signin-form" onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="email" className="form-label">Email Address</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="form-input"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter your email"
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="password" className="form-label">Password</label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    className="form-input"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Enter your password"
                    required
                  />
                </div>

                <div className="form-options">
                  <label className="checkbox-container">
                    <input type="checkbox" className="checkbox-input" />
                    <span className="checkbox-label">Remember me</span>
                  </label>
                  <a href="#" className="forgot-password">Forgot password?</a>
                </div>

                <button type="submit" className="signin-button">
                  Sign In
                </button>
              </form>

              <div className="signin-footer">
                <p className="signup-prompt">
                  Don't have an account? 
                  <a href="#" className="signup-link">
                    <Link to="/register" className="login-link"> Sign up</Link>
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignInPage;