import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('sz_user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const loginAsGuest = () => {
    const guestUser = { name: 'Guest Explorer', role: 'guest', isLoggedIn: true };
    setUser(guestUser);
    localStorage.setItem('sz_user', JSON.stringify(guestUser));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('sz_user');
  };

  return (
    <AuthContext.Provider value={{ user, loginAsGuest, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);