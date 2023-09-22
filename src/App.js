import React, { useState } from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import '../src/App.css';
import HomePage from './components/HomePage';
import Login from './components/Login';
import Navbar from './components/Navbar';
import PasswordPage from './components/PasswordPage';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  return (
    <Router>
      <div className="App">
        <Navbar isLoggedIn={isLoggedIn} handleLogout={handleLogout} />
        <Routes>
          <Route path="/" element={<Login handleLogin={handleLogin} />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/password" element={<PasswordPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
