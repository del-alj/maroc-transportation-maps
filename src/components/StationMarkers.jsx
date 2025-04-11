// components/StationMarkers.jsx
import { Marker, Popup } from 'react-leaflet';
import { useState } from 'react';
import L from 'leaflet';
import '../styles/StationMarkers.css'
const createCustomIcon = (isHovered) => L.divIcon({
  className: 'station-marker',
  iconSize: isHovered ? [15, 15] : [15, 15],
  html: `
    <div class="station-dot ${isHovered ? 'hovered' : ''}">
      <div class="inner-dot"></div>
    </div>
  `
});

export default function StationMarkers({ stations }) {
  const [hoveredStation, setHoveredStation] = useState(null);

  return stations.map(station => {
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
        <Popup className="custom-popup">
          <div className="popup-content">
            <h3 className="station-name">{station.name}</h3>
            <div className="button-group">
              <button className="popup-button directions">
                <span>🗺️ Directions</span>
              </button>
              <button className="popup-button details">
                <span>ℹ️ Details</span>
              </button>
            </div>
          </div>
        </Popup>
      </Marker>
    );
  });
}