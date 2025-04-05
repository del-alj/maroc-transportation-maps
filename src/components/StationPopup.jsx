import { Popup } from 'react-leaflet';

export default function StationPopup({ station }) {
  return (
    <Popup>
      <div className="station-popup">
        <h3>{station?.name}</h3>
        <p>Lines: {station?.lines.join(', ')}</p>
      </div>
    </Popup>
  );
}