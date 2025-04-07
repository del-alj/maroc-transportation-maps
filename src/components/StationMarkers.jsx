// components/StationMarkers.jsx
import { Marker, Popup } from 'react-leaflet';
import L from 'leaflet';

// Custom SVG-based circle marker
const createCustomIcon = (color = '#fff', size = 1) => L.divIcon({
  className: 'custom-marker',
  iconSize: [size, size],
  iconAnchor: [size/2, size/2],
  html: `
    <div style="
      width: ${size}px;
      height: ${size}px;
      background: white;
      border-radius: 50%;
      border: 2px solid black;
      box-shadow: 0 2px 4px rgba(0,0,0,0.2);
      transform: translate(-50%, -50%);
      // clip-path: polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%);
      position: absolute;
      top: 50%;
      left: 50%;

    "></div>
  `
});

// Dynamic size based on zoom level
export default function StationMarkers({ stations, zoom }) {
  // Calculate marker size based on zoom level
  const baseSize = 12;
  const size = Math.min(Math.max(baseSize * (zoom / 15), 8), 20);

  return stations?.map(station => {
    // Get line color from first associated line
    const lineColor = station.lines?.[0]?.color || '#0047A0';
    
    return (
      <Marker
        key={station.id}
        position={station.coordinates}
        icon={createCustomIcon(lineColor, size)}
        interactive={false}
      >
        {/* <Popup className="custom-popup">
          <div className="p-2">
            <h3 className="font-bold text-lg">{station.name}</h3>
            {station.lines?.length > 0 && (
              <div className="mt-1">
                <span className="text-sm">Lines:</span>
                <div className="flex gap-1 mt-1">
                  {station.lines.map(line => (
                    <span 
                      key={line.id}
                      className="px-2 py-1 text-xs rounded-full text-white"
                      style={{ backgroundColor: line.color }}
                    >
                      {line.id}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </Popup> */}
      </Marker>
    );
  });
}