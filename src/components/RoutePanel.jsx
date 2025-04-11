// components/RoutePanel.jsx (example)
export default function RoutePanel({ station, onClose }) {
  return (
    <div className="schedule-panel">
      <div className="panel-header">
        <h2>{station.name} Schedule</h2>
        <button className="close-button" onClick={onClose}>×</button>
      </div>
      {/* Your existing schedule content */}
    </div>
  );
}