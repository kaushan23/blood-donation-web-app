import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import SignInPage from './pages/SignInPage';
import AboutUs from './pages/AboutUsPage';
import DonorListPage from './pages/DonorListPage';
import SearchDonorPage from './pages/SearchDonorPage';
import SearchResultsPage from './pages/SearchResults';
import BloodCampsPage from './pages/BloodCampsPage';
import SplashScreen from './pages/SplashScreen';
import ContactBlood from './pages/ContactBlood';
import Stock from './pages/Stock';
import StockResult from './pages/StockResult';
import RegisterPage from './pages/RegisterPage';
import Profile from './pages/Profile';
import ChangePassword from './pages/ChangePassword';
import './App.css';

function App() {
  const [showSplash, setShowSplash] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if this is the first visit
    const hasSeenSplash = sessionStorage.getItem('hasSeenSplash');
    
    if (!hasSeenSplash) {
      // First visit - show splash screen
      setShowSplash(true);
      setIsLoading(true);
    } else {
      // Not first visit - skip splash
      setShowSplash(false);
      setIsLoading(false);
    }
  }, []);

  const handleSplashComplete = () => {
    setShowSplash(false);
    setIsLoading(false);
    // Mark that user has seen splash screen for this session
    sessionStorage.setItem('hasSeenSplash', 'true');
  };

  // Show splash screen on first load
  if (showSplash && isLoading) {
    return <SplashScreen onComplete={handleSplashComplete} />;
  }

  return (
    <Router>
      <div className="app">
        <Routes>
          <Route path="/" element={<SignInPage />} />
          <Route path="/home" element={<LandingPage />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/donor-list" element={<DonorListPage />} />
          <Route path="/search-donor" element={<SearchDonorPage />} />
          <Route path="/search-results" element={<SearchResultsPage />} />
          <Route path="/camps" element={<BloodCampsPage />} />
          <Route path="/contact-blood" element={<ContactBlood />} />
          <Route path="/cpassword" element={<ChangePassword />} />
          <Route path="/stocks" element={<Stock/>} />
          <Route path="/register" element={<RegisterPage/>} />
          <Route path="/stock-result/:bloodType" element={<StockResult/>} />
          <Route path="/profile" element={<Profile/>} />
          <Route path="/change-password" element={<div>Change Password Page</div>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;