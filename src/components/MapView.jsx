import { useContext, useState } from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';
import { TramNetworkContext } from '../context/TramNetworkContext';
import TramLines from './TramLines';
import StationMarkers from './StationMarkers';
import LineLabels from './LineLabels';
import 'leaflet/dist/leaflet.css'; // Essential Leaflet CSS
// import { useTramNetwork } from '../context/TramNetworkContext';
// src/components/MapView.jsx

import { useMapEvents } from 'react-leaflet';

function ZoomHandler({ onZoom }) {
  const map = useMapEvents({
    zoomend: () => {
      onZoom(map.getZoom());
    }
  });
  return null;
}

export default function MapView() {
  const { lines, stations, loading } = useContext(TramNetworkContext);
  const [zoom, setZoom] = useState(1);

  // Casablanca bounds (SW and NE coordinates)
const CASABLANCA_BOUNDS = [
  [33.50, -7.70],  // Southwest bound (lower left)
  [33.65, -7.50]   // Northeast bound (upper right)
];
  // const { lines, stations } = useTramNetwork();
  if (loading) return <div>Loading...</div>;
  if (!lines.length) return <div>No tram lines found</div>;

  return (
       <MapContainer 
      center={[33.5731, -7.5893]} 
      zoom={13}
      style={{ height: '100vh', width: '100%' }}
      minZoom={13}  // Prevent zooming out further than this
      maxZoom={15}   // Optional: Max zoom-in level
      maxBounds={CASABLANCA_BOUNDS} // Keep map within Casablanca
      maxBoundsViscosity={1.0} // Strict bounds enforcement
    >
      <TileLayer
        url="https://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}{r}.png" 
        attribution='&copy; OpenStreetMap contributors'
        minZoom={13}  // Match container's minZoom
        maxZoom={18}  // Match container's maxZoom
      />
   
      <TramLines lines={lines} />
      <ZoomHandler onZoom={setZoom} />
      <StationMarkers stations={stations} zoom={zoom} />
  
<LineLabels lines={lines} zoom={zoom} />
    </MapContainer>
  );
}