
import { useContext, useState, useEffect } from 'react';
import { 
  MapContainer, 
  TileLayer, 
  Marker, 
  Circle,
  useMapEvents  // Add this import
} from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
// Custom GPS location icon
const gpsIcon = L.divIcon({
  className: 'gps-marker',
  iconSize: [10, 10],
  html: `
    <div style="
      width: 100%;
      height: 100%;
      background: #0066ff;
      border: 2px solid white;
      border-radius: 50%;
      box-shadow: 0 2px 6px rgba(0,0,0,0.1);
      animation: pulse 2.4s infinite;
    "></div>
  `
});


export default function LocationMarker() {
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
          // map.flyTo(newPos, map.getZoom());
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
      {/* <Circle
        center={position}
        radius={accuracy}
        color="#0066ff"
        fillColor="#0066ff"
        fillOpacity={0.2}
      /> */}
      <Marker
        position={position}
        icon={gpsIcon}
      />
    </>
  );
}
