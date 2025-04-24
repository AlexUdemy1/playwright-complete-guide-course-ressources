// App.jsx
import { useState } from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css';
import Home from './components/Home';
import ItemList from './components/ItemList';
import Login from './components/Login';
import PrivateRoute from './components/PrivateRoute';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem('auth_token') !== null;  // If the token exists, the user is authenticated
  });

  const handleLoginSuccess = (status) => {
    setIsAuthenticated(status);  // Update state to true if login is successful
    if (status) {
      localStorage.setItem('auth_token', 'your_token');  // Store token in localStorage
    } else {
      localStorage.removeItem('auth_token');  // Remove token from localStorage on logout
    }
  };

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login onLoginSuccess={handleLoginSuccess} />} />
        <Route path="/" element={
          <PrivateRoute isAuthenticated={isAuthenticated}>
            <Home />
          </PrivateRoute>
        } />
         <Route path="/items" element={<ItemList/>} />
      </Routes>
    </Router>
  );
}

export default App;
