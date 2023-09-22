import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

function Login({ handleLogin }) {
  const [code, setCode] = useState('');
  const navigate = useNavigate();

  const handleUserLogin = () => {
    if (code === '1234') {
      handleLogin();
      navigate('/home');
    } else {
      alert('Invalid code.');
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <div className="login-content">
          <h1 className="login-title">Login</h1>
          <div className="input-container">
            <input 
              type="password" 
              placeholder="Password" 
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="login-input"
            />
          </div>
          <button onClick={handleUserLogin} className="login-button">Login</button>
        </div>
      </div>
    </div>
  );
}

export default Login;
