// components/Header.jsx
import React from 'react';
import '../styles/Header.css'; // CSS import

export default function Header() {
  return (
    <header className="sirway-header">
    <div className="left-section">
      <img src="/logoIcon.png" alt="SirWay Logo" className="logo" />
      <span className="city-name">Casablanca</span>
    </div>
  
    <div className="center-section">
      
    </div>
  
    <div className="right-section">
      <span className="search">
        🔍 <span className="search-text">Search stations</span>
      </span>
      <span className="language">English</span>
    </div>
  </header>
  
  );
}