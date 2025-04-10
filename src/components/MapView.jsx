import { useContext, useState, useEffect } from 'react';
import { 
  MapContainer, 
  TileLayer, 
  Marker, 
  Circle,
  useMapEvents  // Add this import
} from 'react-leaflet';
import { TramNetworkContext } from '../context/TramNetworkContext';
import StationMarkers from './StationMarkers';
import LineLabels from './LineLabels';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import TramLines from './TramLines';
import LocationMarker from './LocationMarker';
import { useCity } from '../context/CityContext';
function ZoomHandler({ onZoom }) {
  const map = useMapEvents({
    zoomend: () => {
      onZoom(map.getZoom());
    }
  });
  return null;
}

// Custom GPS location icon


// Location marker component

// Main component
export default function MapView() {
  const { currentCity } = useCity();
  const { lines, stations, loading } = useContext(TramNetworkContext);
  const [zoom, setZoom] = useState(13);

  const SALE_BOUNDS = [
    [34.02, -6.86],
    [34.06, -6.80]
  ];

  if (loading) return <div>Loading...</div>;
  if (!lines.length) return <div>No tram lines found</div>;

  return (
    <MapContainer 
      center={[34.04, -6.83]} // Salé center coordinates
      zoom={14}
      style={{ height: '100vh', width: '100%' }}
      minZoom={13}
      maxZoom={18}
      // maxBounds={SALE_BOUNDS}
      maxBoundsViscosity={1.0}
    >
      <TileLayer
        url="https://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}{r}.png" 
        attribution='&copy; OpenStreetMap contributors'
      />
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