// components/LocationMarker.jsx
import { useMapEvents, Circle } from 'react-leaflet';
import L from 'leaflet';
import { useState, useEffect, useRef } from 'react';

const LocationMarker = () => {
  const [position, setPosition] = useState(null);
  const [accuracy, setAccuracy] = useState(null);
  const [heading, setHeading] = useState(null);
  const [speed, setSpeed] = useState(null);
  const [tracking, setTracking] = useState(false);
  const watchId = useRef(null);
  const lastUpdate = useRef(0);

  const map = useMapEvents({
    locationfound(e) {
      handlePositionUpdate(e.latlng, e.accuracy);
    },
    locationerror(e) {
      console.error("Geolocation error:", e.message);
      setTracking(false);
    }
  });

  const handlePositionUpdate = (pos, acc) => {
    const now = Date.now();
    if (now - lastUpdate.current > 1000) { // Throttle to 1 update/sec
      setPosition(pos);
      setAccuracy(acc);
      lastUpdate.current = now;
      
      // Smooth map follow
      map.flyTo(pos, map.getZoom(), {
        animate: true,
        duration: 1
      });
    }
  };

  const startTracking = () => {
    if (navigator.geolocation) {
      setTracking(true);
      watchId.current = navigator.geolocation.watchPosition(
        (pos) => {
          const newPos = L.latLng(
            pos.coords.latitude,
            pos.coords.longitude
          );
          handlePositionUpdate(newPos, pos.coords.accuracy);
          setHeading(pos.coords.heading);
          setSpeed(pos.coords.speed);
        },
        (err) => {
          console.error("Geolocation error:", err);
          setTracking(false);
        },
        {
          enableHighAccuracy: true,
          maximumAge: 1000,
          timeout: 5000
        }
      );
    } else {
      console.error("Geolocation not supported");
    }
  };

  const stopTracking = () => {
    if (watchId.current) {
      navigator.geolocation.clearWatch(watchId.current);
      watchId.current = null;
    }
    setTracking(false);
  };

  useEffect(() => {
    return () => {
      if (watchId.current) {
        navigator.geolocation.clearWatch(watchId.current);
      }
    };
  }, []);

  const locationIcon = L.divIcon({
    className: 'location-marker',
    iconSize: [32, 32],
    html: `
      <div style="
        width: 100%;
        height: 100%;
        background: #0066ff;
        border: 2px solid white;
        border-radius: 50%;
        box-shadow: 0 2px 6px rgba(0,0,0,0.3);
        position: relative;
        transform: rotate(${heading || 0}deg);
      ">
        <div style="
          position: absolute;
          top: -6px;
          left: 50%;
          width: 0;
          height: 0;
          border-left: 6px solid transparent;
          border-right: 6px solid transparent;
          border-bottom: 12px solid white;
          transform: translateX(-50%);
        "></div>
      </div>
    `
  });

  return (
    <div className="leaflet-control leaflet-bar">
      <button 
        onClick={tracking ? stopTracking : startTracking}
        className="p-2 bg-white hover:bg-gray-100 text-gray-800 font-semibold"
        style={{ minWidth: '120px' }}
      >
        {tracking ? (
          <span className="flex items-center">
            <span className="animate-pulse">🔴</span>
            <span className="ml-2">Tracking...</span>
          </span>
        ) : (
          '📍 Track My Location'
        )}
      </button>

      {position && (
        <>
          <Circle
            center={position}
            radius={accuracy}
            color="#0066ff"
            fillColor="#0066ff"
            fillOpacity={0.1}
          />
          <L.Marker 
            position={position}
            icon={locationIcon}
          />
        </>
      )}

      {speed !== null && (
        <div className="leaflet-control leaflet-bar bg-white p-2 mt-2">
          <div className="text-xs">
            <div>Speed: {(speed * 3.6).toFixed(1)} km/h</div>
            {heading && <div>Heading: {heading.toFixed(0)}°</div>}
            <div>Accuracy: {accuracy?.toFixed(0)} meters</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LocationMarker;