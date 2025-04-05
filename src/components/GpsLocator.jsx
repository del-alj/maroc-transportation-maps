import { useMap } from 'react-leaflet';

export default function GpsLocator() {
  const map = useMap();

  const handleLocate = () => {
    navigator.geolocation.getCurrentPosition(
      position => {
        map.flyTo([position.coords.latitude, position.coords.longitude], 15);
      },
      error => console.error("Error getting location:", error)
    );
  };

  return (
    <button 
      onClick={handleLocate}
      className="absolute top-4 right-4 z-[1000] bg-white p-2 rounded shadow"
    >
      📍 Locate Me
    </button>
  );
}