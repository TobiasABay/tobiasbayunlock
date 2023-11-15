import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Navbar.css';

function Navbar({ isLoggedIn, handleLogout }) {
  const navigate = useNavigate();

  const handleSignOut = () => {
    handleLogout();
    navigate('/');
  };

  const goToHomePage = () => {
    navigate('/home');
  };

  const handlePasswordPage = () => {
    navigate('/password');
  };

  return (
    <div className="simple-navbar">
      <div className="logo" onClick={goToHomePage}>
        <div className="logo-main">Tobias Bay</div>
        <div className="logo-sub">Unlock</div>
      </div>
      <div className="actions">
        {isLoggedIn && (
          <>
            <button className="action-button" onClick={handlePasswordPage}>Password</button>
            <button className="action-button">Recipes</button>
            <button className="action-button">Action 3</button>
            <button className="logout-button" onClick={handleSignOut}>Sign Out</button>
          </>
        )}
      </div>
    </div>
  );
}

export default Navbar;