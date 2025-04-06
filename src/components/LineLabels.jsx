// components/LineLabels.jsx
import { Marker } from 'react-leaflet';
import L from 'leaflet';

const createLineLabel = (lineName, lineColor) => L.divIcon({
  className: 'line-label',
  iconSize: [100, 25],  // Smaller container size
  iconAnchor: [50, 25], // Anchor at bottom center
  html: `
    <div style="
      background: ${lineColor};
      color: white;
      padding: 3px 12px;  // Tighter padding
      border-radius: 4px; // Less rounded corners (polygon-like)
      font-weight: 600;
      font-size: 12px;    // Smaller text
      text-align: center;
      box-shadow: 0 1px 4px rgba(0,0,0,0.2);
      border: 1px solid #ffffff; // Simpler border
      text-shadow: 1px 1px 2px rgba(0,0,0,0.3);
      font-family: 'Arial', sans-serif;
      transform: translateY(-18px); // Move label upward
      white-space: nowrap; // Prevent text wrapping
    ">
      ${lineName}
    </div>
  `
});

export default function LineLabels({ lines }) {
  return lines.map(line => {
    if (!line.coordinates?.length) return null;
    
    const startPoint = line.coordinates[0];
    const endPoint = line.coordinates[line.coordinates.length - 1];
    const cleanName = line.name.split(':')[0].trim();
    return (
      <>
        <Marker
          key={`${line.id}-start`}
          position={startPoint}
          icon={createLineLabel(cleanName, line.color)}
          zIndexOffset={1000}
          offset={[0, -22]} // Increased upward offset
          interactive={false} // Disable mouse interactions
        />
        <Marker
          key={`${line.id}-end`}
          position={endPoint}
          icon={createLineLabel(cleanName, line.color)}
          zIndexOffset={1000}
            offset={[0, -22]} // Increased upward offset
        interactive={false} // Disable mouse interactions
        />
      </>
    );
  });
}