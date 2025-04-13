import '../styles/Panels.css';
import { useState } from 'react';
export default function RoutePlanner({ onClose, onRouteCalculate }) {
  const [startStation, setStartStation] = useState('');
  const [endStation, setEndStation] = useState('');
  const [routeInstructions, setRouteInstructions] = useState([]);

  const handleCalculateRoute = () => {
    // Call your backend/API to calculate the route
    const fakeApiResponse = {
      steps: ["Walk to Platform A", "Take Train XYZ to Station B", "Arrive in 10 mins"],
      duration: "15 minutes",
      distance: "2.5 km"
    };
    setRouteInstructions(fakeApiResponse.steps);
    onRouteCalculate(fakeApiResponse); // Pass data to parent if needed
  };

  return (
    <div className="route-panel">
      <div className="panel-header">
        <h2>Plan Your Route</h2>
        <button className="close-button" onClick={onClose}>×</button>
      </div>
      
      <div className="route-inputs">
        <select 
          value={startStation} 
          onChange={(e) => setStartStation(e.target.value)}
        >
          <option value="">Select Start Station</option>
          <option value="stationA">Station A</option>
          <option value="stationB">Station B</option>
        </select>
        
        <select
          value={endStation}
          onChange={(e) => setEndStation(e.target.value)}
        >
          <option value="">Select End Station</option>
          <option value="stationA">Station A</option>
          <option value="stationB">Station B</option>
        </select>
        
        <button 
          onClick={handleCalculateRoute}
          disabled={!startStation || !endStation}
        >
          Calculate Route
        </button>
      </div>

      {routeInstructions.length > 0 && (
        <div className="route-instructions">
          <h3>Route Instructions:</h3>
          <ol>
            {routeInstructions.map((step, index) => (
              <li key={index}>{step}</li>
            ))}
          </ol>
        </div>
      )}
    </div>
  );
}