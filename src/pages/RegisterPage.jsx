import { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/RegisterPage.css';
import logo from '../assets/logo-icon.png'; 
import register from '../assets/SignIn-Register/register.jpg'; 

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle registration logic here
    console.log('Registration attempt:', formData);
  };

  return (
    <div className="register-page">
      <div className="register-container">
        <div className="register-header">
          <img 
            src={logo}
            alt="Blood donation logo" 
            className="register-logo"/>
          <span className="register-brand">LifeLink</span>
        </div>

        <div className="register-content">
          <div className="register-card">
            <div className="register-image-section">
              <div className="image-content">
                <img 
                  src= {register}
                  alt="Medical professionals"
                  className="register-hero-image"
                />
              </div>
            </div>

            <div className="register-form-section">
              <h1 className="register-title">Register Now</h1>
              <p className="register-subtitle">Create your account</p>

              <form className="register-form" onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="email" className="form-label">E-mail Address</label>
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

                <div className="form-group">
                  <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
                  <input
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    className="form-input"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="Confirm your password"
                    required
                  />
                </div>

                <button type="submit" className="register-button">
                  Register
                </button>
              </form>

              <div className="register-footer">
                <p className="login-prompt">
                  Already have an account? 
                  <Link to="/signin" className="login-link"> Login</Link>
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