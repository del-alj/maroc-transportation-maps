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

function ZoomHandler({ onZoom }) {
  const map = useMapEvents({
    zoomend: () => {
      onZoom(map.getZoom());
    }
  });
  return null;
}

// Custom GPS location icon
const gpsIcon = L.divIcon({
  className: 'gps-marker',
  iconSize: [20, 20],
  html: `
    <div style="
      width: 100%;
      height: 100%;
      background: #0066ff;
      border: 2px solid white;
      border-radius: 50%;
      box-shadow: 0 2px 6px rgba(0,0,0,0.3);
      animation: pulse 1.5s infinite;
    "></div>
  `
});

// Location marker component
function LocationMarker() {
  const [position, setPosition] = useState(null);
  const [accuracy, setAccuracy] = useState(null);
  const map = useMapEvents({
    locationfound(e) {
      setPosition(e.latlng);
      setAccuracy(e.accuracy);
      map.flyTo(e.latlng, 16);
    },
  });

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.watchPosition(
        (pos) => {
          const newPos = L.latLng(
            pos.coords.latitude,
            pos.coords.longitude
          );
          setPosition(newPos);
          setAccuracy(pos.coords.accuracy);
          map.flyTo(newPos, map.getZoom());
        },
        (err) => console.error("Geolocation error:", err),
        {
          enableHighAccuracy: true,
          maximumAge: 1000,
          timeout: 5000
        }
      );
    }
  }, [map]);

  return position && (
    <>
      <Circle
        center={position}
        radius={accuracy}
        color="#0066ff"
        fillColor="#0066ff"
        fillOpacity={0.2}
      />
      <Marker
        position={position}
        icon={gpsIcon}
      />
    </>
  );
}

// Main component
export default function MapView() {
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
      maxBounds={SALE_BOUNDS}
      maxBoundsViscosity={1.0}
    >
      <TileLayer
        url="https://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}{r}.png" 
        attribution='&copy; OpenStreetMap contributors'
      />
      
      <LocationMarker />
      <ZoomHandler onZoom={setZoom} />
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