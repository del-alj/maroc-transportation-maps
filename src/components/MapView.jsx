import { useContext } from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';
import { TramNetworkContext } from '../context/TramNetworkContext';
import TramLines from './TramLines';
import StationMarkers from './StationMarkers';
import 'leaflet/dist/leaflet.css'; // Essential Leaflet CSS
// import { useTramNetwork } from '../context/TramNetworkContext';
// src/components/MapView.jsx
export default function MapView() {
  const { lines, stations, loading } = useContext(TramNetworkContext);
  // const { lines, stations } = useTramNetwork();
  if (loading) return <div>Loading...</div>;
  if (!lines.length) return <div>No tram lines found</div>;

  return (
    <MapContainer center={[33.5731, -7.5893]} zoom={13}
    style={{ height: '100vh', width: '100%' }} 
    >
         <TileLayer
        url="https://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}{r}.png" 
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <TramLines lines={lines} />
      {/* <StationMarkers stations={stations} /> */}
    </MapContainer>
  );
}