// src/components/TramLines.jsx
import { Polyline } from 'react-leaflet';

export default function TramLines({ lines }) {
  console.log('test', lines);
  return lines?.map(line => (
    <Polyline
      key={line?.id}
      positions={line?.coordinates}
      color={line?.color || '#666'}
      weight={9}
      opacity={1}
    />
  ));
}