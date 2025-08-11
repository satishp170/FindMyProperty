import { createContext, useContext, useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Load user from localStorage on mount
  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token && token.split('.').length === 3) {
      try {
        const decoded = jwtDecode(token);
        const userData = {
          uid: decoded.uid,
          name: decoded.name || decoded.sub,
          email: decoded.sub,
          role: decoded.authorities?.[0]?.replace('ROLE_', ''),
          token,
        };
        setUser(userData);
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      } catch (err) {
        console.error("Invalid token:", err.message);
        localStorage.removeItem('authToken');
        delete axios.defaults.headers.common['Authorization'];
        setUser(null);
      }
    }
  }, []);

  const login = (token) => {
    localStorage.setItem('authToken', token);
    try {
      const decoded = jwtDecode(token);
      const userData = {
        uid: decoded.uid,
        name: decoded.name || decoded.sub,
        email: decoded.sub,
        role: decoded.authorities?.[0]?.replace('ROLE_', ''),
        token,
      };
      setUser(userData);
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } catch (err) {
      console.error("Login failed: Invalid token");
    }
  };

  const logout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('user'); // optional
    delete axios.defaults.headers.common['Authorization'];
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};