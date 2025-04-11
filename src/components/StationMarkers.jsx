// components/StationMarkers.jsx
import { useState } from 'react';
import L from 'leaflet';
import { Marker, Popup } from 'react-leaflet';
import RouteDetails from './RouteDetails';
import RoutePanel from './RoutePanel';
import '../styles/StationMarkers.css';

const createCustomIcon = (isHovered) => L.divIcon({
  className: 'station-marker',
  iconSize: isHovered ? [20, 20] : [15, 15], // Increased size on hover
  html: `
    <div class="station-dot ${isHovered ? 'hovered' : ''}">
      <div class="inner-dot"></div>
    </div>
  `
});

export default function StationMarkers({ stations }) {
  const [hoveredStation, setHoveredStation] = useState(null);
  const [activePanel, setActivePanel] = useState(null);
  const [selectedStation, setSelectedStation] = useState(null);

  const handlePanelClose = () => {
    setActivePanel(null);
    setSelectedStation(null);
  };

  return (
    <>
      {stations.map(station => {
        const isHovered = hoveredStation === station.id;
        
        return (
          <Marker
            key={station.id}
            position={station.coordinates}
            icon={createCustomIcon(isHovered)}
            eventHandlers={{
              mouseover: () => setHoveredStation(station.id),
              mouseout: () => setHoveredStation(null),
            }}
          >
            <Popup className="station-popup-container">
              <div className="station-popup">
                <h3>{station.name}</h3>
                <div className="popup-actions">
                  <button 
                    onClick={() => {
                      setSelectedStation(station);
                      setActivePanel('route');
                    }}
                  >
                    🗺️ Plan Route
                  </button>
                  <button
                    onClick={() => {
                      setSelectedStation(station);
                      setActivePanel('schedule');
                    }}
                  >
                    ⏰ Schedule
                  </button>
                </div>
              </div>
            </Popup>
          </Marker>
        );
      })}

      {/* Right-side Panels */}
      {activePanel === 'route' && selectedStation && (
        <RouteDetails 
          station={selectedStation}
          onClose={handlePanelClose}
        />
      )}

      {activePanel === 'schedule' && selectedStation && (
        <RoutePanel
          station={selectedStation}
          onClose={handlePanelClose}
        />
      )}
    </>
  );
}