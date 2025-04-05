import { Polyline } from 'react-leaflet';

export default function TramLines({ lines }) {
  return lines.map((line, index) => (
    <Polyline
      key={index}
      positions={line.coordinates}
      color={line.color}
      weight={6}
    />
  ));
}