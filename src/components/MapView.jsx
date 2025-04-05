import { useContext } from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';
import { TramNetworkContext } from '../context/TramNetworkContext';
import TramLines from './TramLines';
import StationMarkers from './StationMarkers';
import 'leaflet/dist/leaflet.css'; // Essential Leaflet CSS

export default function MapView() {
  const { lines, stations, loading, error } = useContext(TramNetworkContext);
  
  // Add error boundary for data issues
  if (loading) return <div className="p-4">Loading map data...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!lines.length || !stations.length) return <div className="p-4 text-red-500">No tram data available</div>;

  return (
    <MapContainer 
      center={[33.5731, -7.5893]} 
      zoom={13} 
      style={{ height: '100vh', width: '100%' }} // Required dimensions
    >
      <TileLayer
        url="https://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}{r}.png" 
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <TramLines lines={lines} />
      <StationMarkers stations={stations} />
    </MapContainer>
  );
}
