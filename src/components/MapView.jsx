import { useContext, useState, useEffect } from 'react';
import { MapContainer, TileLayer, useMap } from 'react-leaflet';
import { TramNetworkContext } from '../context/TramNetworkContext';
import { useCity } from '../context/CityContext';
import StationMarkers from './StationMarkers';
import LineLabels from './LineLabels';
import TramLines from './TramLines';
import LocationMarker from './LocationMarker';
import 'leaflet/dist/leaflet.css';

// City configurations
const CITY_CONFIG = {
  Casablanca: {
    center: [33.5731, -7.5893],
    bounds: [[33.50, -7.70], [33.65, -7.50]]
  },
  Rabat: {
    center: [34.0209, -6.8416],
    bounds: [[34.00, -6.85], [34.05, -6.75]]
  }
};

// Component to handle map updates when city changes
function CityUpdater() {
  const { currentCity } = useCity();
  const map = useMap();

  // Update map view when city changes
  useEffect(() => {
    const config = CITY_CONFIG[currentCity];
    if (config) {
      map.flyTo(config.center, 14);
      map.setMaxBounds(config.bounds);
    }
  }, [currentCity, map]);

  return null;
}

export default function MapView() {
  const { currentCity } = useCity();
  const { lines, stations, loading } = useContext(TramNetworkContext);
  const [zoom, setZoom] = useState(13);

  // Get current city configuration or fallback to Casa
  const cityConfig = CITY_CONFIG[currentCity] || CITY_CONFIG.Casablanca;

  if (loading) return <div>Loading...</div>;
  if (!lines.length) return <div>No tram lines found</div>;

  return (
    <MapContainer 
      center={cityConfig.center}
      zoom={14}
      style={{ height: '100vh', width: '100%' }}
      minZoom={13}
      maxZoom={18}
      maxBounds={cityConfig.bounds}
      maxBoundsViscosity={1.0}
    >
      <TileLayer
        url="https://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x/{y}{r}.png" 
        attribution='&copy; OpenStreetMap contributors'
      />
      {/* City-specific updates */}
      <CityUpdater />
      {/* Map components */}
      <TramLines lines={lines} />
      <LocationMarker />
      {/* <ZoomHandler onZoom={setZoom} /> */}
      <StationMarkers stations={stations} zoom={zoom} />
      <LineLabels lines={lines} zoom={zoom} />

      {/* Add CSS animation */}
      <style>{`
        @keyframes pulse {
          0% { transform: scale(0.9); opacity: 1; }
          70% { transform: scale(1.3); opacity: 0.5; }
          100% { transform: scale(0.9); opacity: 1; }
        }
        .gps-marker div {
          animation: pulse 1.5s infinite;
        }
      `}</style>
    </MapContainer>
  );
}