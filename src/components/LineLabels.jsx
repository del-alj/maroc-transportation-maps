// components/LineLabels.jsx
import { Marker } from 'react-leaflet';
import L from 'leaflet';

const createLineLabel = (lineName, lineColor, zoom) => {
  const baseSize = 40;  // Base size at zoom 13
  let size = baseSize + (zoom - 13) * 3;  // Grow 3px per zoom level
  let fontSize = 11 + (zoom - 13) * 0.5;  // Grow font 0.5px per zoom level
  if (zoom < 13 ) {
    fontSize = 11 + (13 - 13) * 0.5; 
    size = baseSize + (13 - 13) * 3;
  }
  // Dynamic sizing based on zoom level
  
  return L.divIcon({
    className: 'line-label',
    iconSize: [size, size],
    iconAnchor: [size/2, size],  // Center bottom anchor
    html: `
      <div style="
        background: ${lineColor};
        color: white;
        width: ${size}px;
        height: ${size}px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: 600;
        font-size: ${fontSize}px;
        box-shadow: 0 2px 6px rgba(0,0,0,0.3);
        // border: 2px solid #ffffff;
        text-shadow: 1px 1px 2px rgba(0,0,0,0.3);
        font-family: 'Arial', sans-serif;
        // transform: translateY(-${size + 10}px);
        transform: translateY(-18px); // Move label upward

      ">
        ${lineName}
      </div>
    `
  });
};

export default function LineLabels({ lines, zoom }) {

  const baseSize = 40;  // Base size at zoom 13
  const size = baseSize + (zoom - 13) * 3;  // Grow 3px per zoom level
  const fontSize = 11 + (zoom - 13) * 0.5;  // Grow font 0.5px per zoom level
  console.log('size in zoom', zoom, 'is: ',size);
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
          icon={createLineLabel(cleanName, line.color, zoom)}
          zIndexOffset={1000}
          offset={[0, -size - 15]}  // Dynamic offset
          interactive={false}
        />
        <Marker
         key={`${line.id}-end`}
          position={endPoint}
          icon={createLineLabel(cleanName, line.color, zoom)}
          // icon={createLineLabel(cleanName, line.color)}

          zIndexOffset={1000}
          offset={[0, -size - 15]}  // Dynamic offset
          // offset={[0, -22]} // Increased upward offset

          interactive={false}
        />
      </>
    );
  });
}