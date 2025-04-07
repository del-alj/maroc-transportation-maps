// src/pages/HomePage.js or App.js

import React from 'react';
import '../styles/ComingSoon.css';
import logo from '../sirwaylogo.png'; // adjust path to your logo

const ComingSoon = () => {
  return (
    <div className="coming-soon-container">
      <img src={logo} alt="SirWay Logo" className="logo" />
      <h1>Coming Soon</h1>
      <p>We're building something amazing for transportation in Morocco.</p>
    </div>
  );
};

export default ComingSoon;
