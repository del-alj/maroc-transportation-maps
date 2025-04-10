// components/Header.jsx
import React, { useState, useContext } from 'react';
import { useCity } from '../context/CityContext';  // Correct import
import { CityContext } from '../context/CityContext'; // You'll need to create this context
import '../styles/Header.css';
// components/Header.jsx
export default function Header() {
  const { currentCity, setCurrentCity } = useCity();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const cities = ['Casablanca', 'Rabat'];

  return (
    <header className="sirway-header">
      <div className="left-section">
        <img src="/logoIcon.png" alt="SirWay Logo" className="logo" />
        <div className="city-selector">
          <div 
            className="current-city"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          >
            {currentCity}
            <span className="dropdown-indicator">▼</span>
          </div>
          
          {isDropdownOpen && (
            <ul className="city-list">
              {cities.map(city => (
                <li
                  key={city}
                  className="city-option"
                  onClick={() => {
                    setCurrentCity(city);
                    setIsDropdownOpen(false);
                  }}
                >
                  {city}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </header>
  );
}