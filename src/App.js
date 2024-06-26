import React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import '../src/App.css';
import HomePage from './pages/HomePage';
import PasswordPage from './pages/PasswordPage';
import RecipesPage from './pages/RecipesPage';


function App() {
  return (
    <Router>
      <div className="App">

        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/password" element={<PasswordPage />} />
          <Route path="/recipes" element={<RecipesPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
//
// <Route path="/" element={<Login handleLogin={handleLogin} />} />