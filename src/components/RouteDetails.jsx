// components/RouteDetails.jsx (example)
import '../styles/Panels.css'

export default function RouteDetails({ station, onClose }) {
  return (
    <div className="route-panel">
      <div className="panel-header">
        <h2>Route from {station.name}</h2>
        <button className="close-button" onClick={onClose}>×</button>
      </div>
      {/* Your existing route details content */}
    </div>
  );
}