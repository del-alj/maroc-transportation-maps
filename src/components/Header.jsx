// components/Header.jsx
import React, { useState } from 'react';
import { useCity } from '../context/CityContext';
import '../styles/Header.css';

export default function Header() {
  const { currentCity, setCurrentCity } = useCity();
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const cities = ['Casablanca', 'Rabat'];

  return (
    <header className="sirway-header">
      {/* Left Section - Logo */}
      <div className="left-section">
        <img src="/logoIcon.png" alt="SirWay Logo" className="logo" />
      </div>

      {/* Center Section - Cities */}
      <div className="center-section">
        {cities.map(city => (
          <button
            key={city}
            className={`city-button ${currentCity === city ? 'active' : ''}`}
            onClick={() => setCurrentCity(city)}
          >
            {city}
          </button>
        ))}
      </div>

      {/* Right Section - Search */}
      <div className="right-section">
        <div className={`search-container ${isSearchFocused ? 'focused' : ''}`}>
          <input
            type="text"
            placeholder="Search city..."
            className="search-input"
            onFocus={() => setIsSearchFocused(true)}
            onBlur={() => setIsSearchFocused(false)}
          />
        </div>
      </div>
    </header>
  );
}