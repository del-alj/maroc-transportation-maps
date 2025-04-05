import { Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import { DefaultIcon } from '../utils/leafletIcons';

// Set default icon
L.Marker.prototype.options.icon = DefaultIcon;

export default function StationMarkers({ stations }) {
  return stations.map(station => (
    <Marker
      key={station?.id}
      position={station?.coordinates}
    >
      <Popup>
        <div className="station-popup">
          <h3 className="font-bold">{station?.name}</h3>
          <p>Lines: {station?.lines.join(', ')}</p>
        </div>
      </Popup>
    </Marker>
  ));
}