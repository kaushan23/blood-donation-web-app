// import React, { useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import '../styles/RegisterPage.css';
// import logo from '../assets/logo.png'; 

// const RegisterPage = () => {
//   const [currentStep, setCurrentStep] = useState(1);
//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     phone: '',
//     dateOfBirth: '',
//     address: '',
//     bloodType: '',
//     medicalHistory: '',
//     password: '',
//     confirmPassword: '',
//     role: 'user' // Default role
//   });
  
//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value
//     });
//   };

//   const handleNextStep = (e) => {
//     e.preventDefault();
    
//     // Validate Step 1 fields
//     if (!formData.name || !formData.email || !formData.phone || !formData.dateOfBirth) {
//       alert('Please fill in all required fields!');
//       return;
//     }

//     // Email validation
//     const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     if (!emailPattern.test(formData.email)) {
//       alert('Please enter a valid email address!');
//       return;
//     }

//     setCurrentStep(2);
//   };

//   const handlePrevStep = () => {
//     setCurrentStep(1);
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
    
//     // Validate Step 2 fields
//     if (!formData.address || !formData.bloodType || !formData.password || !formData.confirmPassword) {
//       alert('Please fill in all required fields!');
//       return;
//     }

//     // Password validation
//     if (formData.password !== formData.confirmPassword) {
//       alert('Passwords do not match!');
//       return;
//     }

//     if (formData.password.length < 6) {
//       alert('Password must be at least 6 characters long!');
//       return;
//     }

//     // Store user data in localStorage
//     const userData = {
//       ...formData,
//       id: Date.now(), // Simple ID generation
//       donationCount: 0,
//       lastDonation: 'N/A'
//     };

//     localStorage.setItem('userData', JSON.stringify(userData));
//     alert('Registration successful!');
//     navigate('/signin');
//   };

//   return (
//     <div className="register-page">
//       <div className="register-container">
//         <div className="register-header">
//           <img src= {logo} alt="Logo" className="register-logo" />
//         </div>

//         <div className="register-content">
//           <div className="register-card">
//             <div className="register-image-section">
//               <div className="image-content">
//                 <img src="" alt="" className="register-hero-image" />
//               </div>
//             </div>

//             <div className="register-form-section">
//               {/* Step Indicator */}
//               <div className="step-indicator">
//                 <div className={`step ${currentStep >= 1 ? 'active' : ''}`}>
//                   <span className="step-number">1</span>
//                   <span className="step-text">Basic Info</span>
//                 </div>
//                 <div className="step-line"></div>
//                 <div className={`step ${currentStep >= 2 ? 'active' : ''}`}>
//                   <span className="step-number">2</span>
//                   <span className="step-text">Complete</span>
//                 </div>
//               </div>

//               <h1 className="register-title">
//                 {currentStep === 1 ? 'Create Account' : 'Complete Registration'}
//               </h1>
//               <p className="register-subtitle">
//                 {currentStep === 1 
//                   ? 'Join our community and help save lives through blood donation'
//                   : 'Just a few more details to complete your registration'
//                 }
//               </p>

//               {/* Step 1: Basic Information */}
//               {currentStep === 1 && (
//                 <form className="register-form" onSubmit={handleNextStep}>
//                   <div className="form-row">
//                     <div className="form-group">
//                       <label className="form-label">Full Name *</label>
//                       <input
//                         type="text"
//                         name="name"
//                         className="form-input"
//                         placeholder="Enter your full name"
//                         value={formData.name}
//                         onChange={handleChange}
//                         required
//                       />
//                     </div>

//                     <div className="form-group">
//                       <label className="form-label">Email Address *</label>
//                       <input
//                         type="email"
//                         name="email"
//                         className="form-input"
//                         placeholder="Enter your email"
//                         value={formData.email}
//                         onChange={handleChange}
//                         required
//                       />
//                     </div>
//                   </div>

//                   <div className="form-row">
//                     <div className="form-group">
//                       <label className="form-label">Phone Number *</label>
//                       <input
//                         type="tel"
//                         name="phone"
//                         className="form-input"
//                         placeholder="Enter your phone number"
//                         value={formData.phone}
//                         onChange={handleChange}
//                         required
//                       />
//                     </div>

//                     <div className="form-group">
//                       <label className="form-label">Date of Birth *</label>
//                       <input
//                         type="date"
//                         name="dateOfBirth"
//                         className="form-input"
//                         value={formData.dateOfBirth}
//                         onChange={handleChange}
//                         required
//                       />
//                     </div>
//                   </div>

//                   <button type="submit" className="register-button">
//                     Continue to Next Step
//                   </button>
//                 </form>
//               )}

//               {/* Step 2: Additional Details */}
//               {currentStep === 2 && (
//                 <form className="register-form" onSubmit={handleSubmit}>
//                   <div className="form-group">
//                     <label className="form-label">Address *</label>
//                     <textarea
//                       name="address"
//                       className="form-textarea"
//                       placeholder="Enter your full address"
//                       value={formData.address}
//                       onChange={handleChange}
//                       rows="2"
//                       required
//                     />
//                   </div>

//                   <div className="form-group">
//                     <label className="form-label">Blood Type *</label>
//                     <select
//                       name="bloodType"
//                       className="form-select"
//                       value={formData.bloodType}
//                       onChange={handleChange}
//                       required
//                     >
//                       <option value="">Select your blood type</option>
//                       <option value="A+">A+</option>
//                       <option value="A-">A-</option>
//                       <option value="B+">B+</option>
//                       <option value="B-">B-</option>
//                       <option value="AB+">AB+</option>
//                       <option value="AB-">AB-</option>
//                       <option value="O+">O+</option>
//                       <option value="O-">O-</option>
//                     </select>
//                   </div>

//                   <div className="form-group">
//                     <label className="form-label">Medical History</label>
//                     <textarea
//                       name="medicalHistory"
//                       className="form-textarea"
//                       placeholder="Enter any relevant medical history (optional)"
//                       value={formData.medicalHistory}
//                       onChange={handleChange}
//                       rows="2"
//                     />
//                   </div>

//                   <div className="form-row">
//                     <div className="form-group">
//                       <label className="form-label">Password *</label>
//                       <input
//                         type="password"
//                         name="password"
//                         className="form-input"
//                         placeholder="Create a password"
//                         value={formData.password}
//                         onChange={handleChange}
//                         required
//                         minLength="6"
//                       />
//                     </div>

//                     <div className="form-group">
//                       <label className="form-label">Confirm Password *</label>
//                       <input
//                         type="password"
//                         name="confirmPassword"
//                         className="form-input"
//                         placeholder="Confirm your password"
//                         value={formData.confirmPassword}
//                         onChange={handleChange}
//                         required
//                         minLength="6"
//                       />
//                     </div>
//                   </div>

//                   <div className="form-buttons">
//                     <button type="button" className="back-button" onClick={handlePrevStep}>
//                       Back
//                     </button>
//                     <button type="submit" className="register-button">
//                       Create Account
//                     </button>
//                   </div>
//                 </form>
//               )}

//               <div className="register-footer">
//                 <p className="login-prompt">
//                   Already have an account?{' '}
//                   <Link to="/" className="login-link">
//                     Sign In
//                   </Link>
//                 </p>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default RegisterPage;

import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/RegisterPage.css';
import logo from '../assets/logo.png'; 
import { UserContext } from '../context/UserContext';

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
    role: 'user', // Default role
    // Doctor specific fields
    hospitalAffiliation: '',
    licenseNumber: '',
    specialization: '',
    experience: ''
  });
  
  const navigate = useNavigate();
  const { registerUser } = useContext(UserContext);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleRoleChange = (e) => {
    const newRole = e.target.value;
    setFormData({
      ...formData,
      role: newRole,
      // Clear blood type for doctors and admins
      bloodType: newRole === 'user' ? formData.bloodType : ''
    });
  };

  const validateStep1 = () => {
    if (!formData.name || !formData.email || !formData.phone || !formData.dateOfBirth || !formData.role) {
      alert('Please fill in all required fields!');
      return false;
    }

    // Email validation
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(formData.email)) {
      alert('Please enter a valid email address!');
      return false;
    }

    return true;
  };

  const validateStep2 = () => {
    if (!formData.address || !formData.password || !formData.confirmPassword) {
      alert('Please fill in all required fields!');
      return false;
    }

    // Role-specific validation
    if (formData.role === 'user' && !formData.bloodType) {
      alert('Blood type is required for donors/patients!');
      return false;
    }

    if (formData.role === 'doctor') {
      if (!formData.hospitalAffiliation || !formData.licenseNumber || !formData.specialization) {
        alert('Please fill in all doctor-specific required fields!');
        return false;
      }
    }

    // Password validation
    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match!');
      return false;
    }

    if (formData.password.length < 6) {
      alert('Password must be at least 6 characters long!');
      return false;
    }

    return true;
  };

  const handleNextStep = (e) => {
    e.preventDefault();
    
    if (!validateStep1()) return;
    setCurrentStep(2);
  };

  const handlePrevStep = () => {
    setCurrentStep(1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validateStep2()) return;

    try {
      registerUser(formData);
      alert('Registration successful!');
      navigate('/');
    } catch {
      alert('Registration failed. Please try again.');
    }
  };

  const getRoleDisplayName = (role) => {
    switch(role) {
      case 'user': return 'Donor';
      case 'doctor': return 'Doctor';
      case 'admin': return 'Administrator';
      default: return role;
    }
  };

  return (
    <div className="register-page">
      <div className="register-container">
        <div className="register-header">
          <img src={logo} alt="Logo" className="register-logo" />
        </div>

        <div className="register-content">
          <div className="register-card">
            <div className="register-image-section">
              <div className="image-content">
                <div className="hero-text">
                  <h2>Join LifeLink</h2>
                  <p>Help save lives through our blood donation network</p>
                </div>
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
                  ? 'Join our community as a patient, donor, doctor, or administrator'
                  : `Complete your ${getRoleDisplayName(formData.role)} registration`
                }
              </p>

              {/* Step 1: Basic Information */}
              {currentStep === 1 && (
                <form className="register-form" onSubmit={handleNextStep}>
                  <div className="form-group">
                    <label className="form-label">Account Type *</label>
                    <select
                      name="role"
                      className="form-select"
                      value={formData.role}
                      onChange={handleRoleChange}
                      required
                    >
                      <option value="user">Donor</option>
                      {/* <option value="doctor">Doctor</option> */}
                      <option value="admin">Administrator</option>
                    </select>
                  </div>

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

                  {/* Conditional fields based on role */}
                  {formData.role === 'user' && (
                    <>
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
                    </>
                  )}

                  {formData.role === 'doctor' && (
                    <>
                      <div className="form-row">
                        <div className="form-group">
                          <label className="form-label">Hospital Affiliation *</label>
                          <input
                            type="text"
                            name="hospitalAffiliation"
                            className="form-input"
                            placeholder="Enter hospital name"
                            value={formData.hospitalAffiliation}
                            onChange={handleChange}
                            required
                          />
                        </div>

                        <div className="form-group">
                          <label className="form-label">Medical License Number *</label>
                          <input
                            type="text"
                            name="licenseNumber"
                            className="form-input"
                            placeholder="Enter license number"
                            value={formData.licenseNumber}
                            onChange={handleChange}
                            required
                          />
                        </div>
                      </div>

                      <div className="form-row">
                        <div className="form-group">
                          <label className="form-label">Specialization *</label>
                          <select
                            name="specialization"
                            className="form-select"
                            value={formData.specialization}
                            onChange={handleChange}
                            required
                          >
                            <option value="">Select specialization</option>
                            <option value="General Medicine">General Medicine</option>
                            <option value="Emergency Medicine">Emergency Medicine</option>
                            <option value="Surgery">Surgery</option>
                            <option value="Cardiology">Cardiology</option>
                            <option value="Hematology">Hematology</option>
                            <option value="Oncology">Oncology</option>
                            <option value="Other">Other</option>
                          </select>
                        </div>

                        <div className="form-group">
                          <label className="form-label">Years of Experience</label>
                          <input
                            type="number"
                            name="experience"
                            className="form-input"
                            placeholder="Enter years of experience"
                            value={formData.experience}
                            onChange={handleChange}
                            min="0"
                            max="50"
                          />
                        </div>
                      </div>
                    </>
                  )}

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