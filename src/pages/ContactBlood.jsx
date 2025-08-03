import React, { useState } from 'react';
import '../styles/ContactBlood.css';
import Navbar from '../components/Navbar';
const ContactBlood = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
    bloodGroup: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'];

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    try {
      // Replace with actual API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      alert('Message sent successfully! We will contact you soon.');
      setFormData({
        name: '',
        email: '',
        phone: '',
        message: '',
        bloodGroup: ''
      });
    // } catch (error) {
    //   alert('Error sending message. Please try again.');
    // } finally {
    //   setIsSubmitting(false);
    // }
    } catch{
      alert('Error sending message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Navbar/>
      <div className="contact-blood-page">
        <div className="contact-container">
          <div className="contact-content">
            <div className="image-section">
              <div className="image-wrapper">
                <img 
                  src="https://images.unsplash.com/photo-1559757175-0eb30cd8c063?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                  alt="Medical professional"
                  className="contact-hero-image"
                />
                <div className="image-overlay">
                  <div className="overlay-content">
                    <h2 className="overlay-title">We're Here to Help</h2>
                    <p className="overlay-text">
                      Our medical team is ready to assist you with your blood donation needs. 
                      Every request is handled with care and urgency.
                    </p>
                    <div className="stats-grid">
                      <div className="stat-item">
                        <span className="stat-number">24/7</span>
                        <span className="stat-label">Available</span>
                      </div>
                      <div className="stat-item">
                        <span className="stat-number">5000+</span>
                        <span className="stat-label">Lives Saved</span>
                      </div>
                      <div className="stat-item">
                        <span className="stat-number">100%</span>
                        <span className="stat-label">Safe</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="form-section">
              <div className="form-header">
                <h1 className="contact-title">Contact For Blood</h1>
                <p className="contact-subtitle">Fill following form for blood</p>
              </div>

              <form className="contact-form" onSubmit={handleSubmit}>
                <div className="form-group">
                  <input
                    type="text"
                    name="name"
                    className="form-input"
                    placeholder="Your Name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <input
                    type="email"
                    name="email"
                    className="form-input"
                    placeholder="E-mail Address"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <input
                    type="tel"
                    name="phone"
                    className="form-input"
                    placeholder="Phone Number"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <textarea
                    name="message"
                    className="form-textarea"
                    placeholder="Message"
                    rows="4"
                    value={formData.message}
                    onChange={handleChange}
                    required
                  ></textarea>
                </div>

                <div className="form-group">
                  <div className="select-wrapper">
                    <select
                      name="bloodGroup"
                      className="form-select"
                      value={formData.bloodGroup}
                      onChange={handleChange}
                      required
                    >
                      <option value="">Blood Group</option>
                      {bloodGroups.map((group) => (
                        <option key={group} value={group}>
                          {group}
                        </option>
                      ))}
                    </select>
                    <div className="select-arrow">
                      <svg width="12" height="8" viewBox="0 0 12 8" fill="none">
                        <path d="M1 1L6 6L11 1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                  </div>
                </div>

                <button 
                  type="submit" 
                  className={`submit-btn ${isSubmitting ? 'submitting' : ''}`}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <div className="loading-spinner"></div>
                      Sending...
                    </>
                  ) : (
                    'Send Message'
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ContactBlood;