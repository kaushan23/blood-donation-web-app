import React from 'react';
import '../styles/DonorListPage.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from '../components/Navbar'; // Import the Navbar component

const DonorListPage = () => {
  // Sample donor data - you can replace this with API data
  const donors = [
    {
      id: 1,
      name: "A.D.Perera",
      gender: "Male",
      bloodGroup: "AB+",
      mobile: "0765527896",
      email: "abc@gmail.com",
      age: "30 yrs",
      address: "Colombo",
      message: "Call me if blood requiring"
    },
    {
      id: 2,
      name: "K.D.Silva",
      gender: "Female",
      bloodGroup: "O+",
      mobile: "0772107752",
      email: "silva@gmail.com",
      age: "25 yrs",
      address: "Kalutara",
      message: "Call me if blood requiring"
    },
    {
      id: 3,
      name: "S.H.Amarathunga",
      gender: "Female",
      bloodGroup: "AB+",
      mobile: "0714588012",
      email: "sanduni@gmail.com",
      age: "30 yrs",
      address: "Gampaha",
      message: "Call me if blood requiring"
    },
    {
      id: 4,
      name: "Kasun Wickramage",
      gender: "Male",
      bloodGroup: "B-",
      mobile: "0707520149",
      email: "kasun@gmail.com",
      age: "33 yrs",
      address: "Galle",
      message: "Call me if blood requiring"
    },
    {
      id: 5,
      name: "Hasini Liyanage",
      gender: "Female",
      bloodGroup: "AB-",
      mobile: "0714496752",
      email: "hasini@gmail.com",
      age: "27 yrs",
      address: "Kalutara",
      message: "Call me if blood requiring"
    },
    {
      id: 6,
      name: "Thisara Madhushika",
      gender: "Male",
      bloodGroup: "O-",
      mobile: "0771224152",
      email: "thisara@gmail.com",
      age: "23 yrs",
      address: "Colombo",
      message: "Call me if blood requiring"
    }
  ];

  const handleRequest = (donorName) => {
    alert(`Request sent to ${donorName}`);
    // Add your request logic here
  };

  return (
    <div className="donor-list-page">
      {/* Use the Navbar Component */}
      <Navbar />

      {/* Donor List Section */}
      <div className="donor-list-section">
        <div className="donor-list-container">
          <div className="donors-grid">
            {donors.map((donor) => (
              <div key={donor.id} className="donor-card">
                <div className="donor-avatar">
                  <div className="avatar-icon">
                    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 12C14.7614 12 17 9.76142 17 7C17 4.23858 14.7614 2 12 2C9.23858 2 7 4.23858 7 7C7 9.76142 9.23858 12 12 12Z" fill="currentColor"/>
                      <path d="M12 14C7.58172 14 4 17.5817 4 22H20C20 17.5817 16.4183 14 12 14Z" fill="currentColor"/>
                    </svg>
                  </div>
                </div>
                
                <div className="donor-info">
                  <div className="info-row">
                    <span className="info-label">Name :</span>
                    <span className="info-value">{donor.name}</span>
                  </div>
                  <div className="info-row">
                    <span className="info-label">Gender :</span>
                    <span className="info-value">{donor.gender}</span>
                  </div>
                  <div className="info-row">
                    <span className="info-label">Blood Group :</span>
                    <span className="info-value">{donor.bloodGroup}</span>
                  </div>
                  <div className="info-row">
                    <span className="info-label">Mobile Number :</span>
                    <span className="info-value">{donor.mobile}</span>
                  </div>
                  <div className="info-row">
                    <span className="info-label">E-mail :</span>
                    <span className="info-value">{donor.email}</span>
                  </div>
                  <div className="info-row">
                    <span className="info-label">Age :</span>
                    <span className="info-value">{donor.age}</span>
                  </div>
                  <div className="info-row">
                    <span className="info-label">Address :</span>
                    <span className="info-value">{donor.address}</span>
                  </div>
                  <div className="info-row">
                    <span className="info-label">Message :</span>
                    <span className="info-value">{donor.message}</span>
                  </div>
                </div>

                <button 
                  className="request-btn"
                  onClick={() => handleRequest(donor.name)}
                >
                  Request
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DonorListPage;