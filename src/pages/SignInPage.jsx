import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
// import users from "../assets/data/userDetails";
  // Import users data
import '../styles/SignInPage.css';
import logo from '../assets/logo-icon.png'; 
import signin from '../assets/SignIn-Register/signin.jpg'; 
import { UserContext } from '../context/UserContext';

const SignInPage = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const navigate = useNavigate();
  const { login } = useContext(UserContext);
 const handleSubmit = (e) => {
    e.preventDefault();

    const { email, password } = formData;

    const success = login(email, password); // use context login

    if (success) {
      // get the logged-in user from localStorage or from context (better from context)
      const loggedUser = JSON.parse(localStorage.getItem('userData'));
      if (loggedUser.role === 'admin') {
        navigate('/home');
      } else if (loggedUser.role === 'user') {
        navigate('/home');
      }
    } else {
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
            className="signin-logo"
          />
          <span className="signin-brand">LifeLink</span>
        </div>

        <div className="signin-content">
          <div className="signin-card">
            <div className="signin-image-section">
              <div className="image-content">
                <img 
                  src={signin}
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
                  <Link to="/home"> Sign In</Link>                  
                </button>
              </form>

              <div className="signin-footer">
                <p className="signup-prompt">
                  Don't have an account? 
                  <Link to="/register" className="signup-link"> Sign up</Link>
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
