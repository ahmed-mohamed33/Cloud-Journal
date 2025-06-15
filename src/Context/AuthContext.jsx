import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState();
  const [user, setUser] = useState(null);
  const [userName, setUserName] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    const userName = localStorage.getItem('userName');
    if (token) {
      setIsAuthenticated(true);
      setUser(user);
      setUserName(userName);
    }
  }, []);
  

  const logout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
    toast.success('Logged out successfully', {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        theme: "colored",
        style: {
          background: "#a0d4ee",
          color: '#fff'
        },
        draggable: true,
      });
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
