import React from 'react';
import './HomePage.css';
import Navbar from './Navbar';

function HomePage() {
  return (
    <div className="homepage-container">
      <Navbar></Navbar>
      <div className="welcome-text">
        Welcome to
      </div>
      <div className="name-text">
        Tobias Bay
      </div>
      <div className="unlock-container">
        <div className="unlock-text">
          Unlock
        </div>
        <div class="ocean">
          <div class="wave"></div>
          <div class="wave"></div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
