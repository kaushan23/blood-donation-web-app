// // src/context/UserContext.jsx
// import React, { createContext, useEffect, useState } from "react";
// import users from "../assets/data/userDetails";

// export const UserContext = createContext();

// export const UserProvider = ({ children }) => {
//   const [currentUser, setCurrentUser] = useState(null);

//   useEffect(() => {
//     const storedUser = localStorage.getItem('userData');
//     if (storedUser) {
//       setCurrentUser(JSON.parse(storedUser));
//     }
//   }, []);

//   const login = (email, password) => {
//     const user = users.find(u => u.email === email && u.password === password);
//     if (user) {
//       setCurrentUser(user);
//       localStorage.setItem('userData', JSON.stringify(user));
//       return true;
//     }
//     return false;
//   };

//   const logout = () => {
//     setCurrentUser(null);
//     localStorage.removeItem('userData');
//   };

//   return (
//     <UserContext.Provider value={{ currentUser, login, logout }}>
//       {children}
//     </UserContext.Provider>
//   );
// };
// src/context/UserContext.jsx
import React, { createContext, useEffect, useState } from "react";
import users from "../assets/data/userDetails";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('userData');
    if (storedUser) {
      setCurrentUser(JSON.parse(storedUser));
    }
  }, []);

  const login = (email, password) => {
    const user = users.find(u => u.email === email && u.password === password);
    if (user) {
      setCurrentUser(user);
      localStorage.setItem('userData', JSON.stringify(user));
      return true;
    }
    return false;
  };

  const registerUser = (userData) => {
    // Add new user to the users array (in a real app, this would be saved to backend)
    const newUser = {
      ...userData,
      id: Date.now(),
      donationCount: userData.role === 'donor' ? 0 : undefined,
      lastDonation: userData.role === 'donor' ? 'N/A' : undefined,
      hospitalAffiliation: userData.role === 'doctor' ? userData.hospitalAffiliation : undefined,
      licenseNumber: userData.role === 'doctor' ? userData.licenseNumber : undefined,
      specialization: userData.role === 'doctor' ? userData.specialization : undefined
    };
    
    // Store in localStorage for persistence (in a real app, send to backend)
    const existingUsers = JSON.parse(localStorage.getItem('allUsers')) || [];
    existingUsers.push(newUser);
    localStorage.setItem('allUsers', JSON.stringify(existingUsers));
    
    return newUser;
  };

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem('userData');
  };

  return (
    <UserContext.Provider value={{ currentUser, login, logout, registerUser }}>
      {children}
    </UserContext.Provider>
  );
};