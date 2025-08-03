import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Stock.css';
import Navbar from '../components/Navbar';

const Stock = () => {
  const navigate = useNavigate();

  const bloodStocks = [
    { type: 'A+', count: 100 },
    { type: 'A-', count: 90 },
    { type: 'B+', count: 120 },
    { type: 'B-', count: 80 },
    { type: 'O+', count: 110 },
    { type: 'O-', count: 75 },
    { type: 'AB+', count: 110 },
    { type: 'AB-', count: 66 }
  ];

  const handleViewDetails = (bloodType) => {
    // URL encode the blood type to handle special characters like + and -
    const encodedBloodType = encodeURIComponent(bloodType);
    navigate(`/stock-result/${encodedBloodType}`);
  };

  return (
    <div className="stock-page">
      {/* Use the Navbar Component */}
      <Navbar />
      
      <div className="stock-container">
        <div className="stock-content">
          <h1 className="stock-title">Blood Inventory</h1>
          <p className="stock-subtitle">Available blood stocks</p>
          
          <div className="blood-grid">
            {bloodStocks.map((stock, index) => (
              <div key={index} className="blood-card">
                <div className="blood-info">
                  <div className="blood-type">{stock.type}</div>
                  <div className="blood-count">{stock.count}</div>
                </div>
                <button 
                  className="view-details-btn"
                  onClick={() => handleViewDetails(stock.type)}
                >
                  View Details
                  <span className="arrow">›</span>
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Stock;