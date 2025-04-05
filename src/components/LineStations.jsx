// components/LineStations.jsx
function LineStations({ line }) {
    return (
      <div className="line-container">
        <div className="line-header" style={{ borderColor: line?.color }}>
          {line?.name}
        </div>
        <div className="stations-list">
          {line?.stations.map(station => (
            <div key={station?.id} className="station-item">
              <div className="station-marker" style={{ backgroundColor: line?.color }} />
              {station?.name}
            </div>
          ))}
        </div>
      </div>
    );
  }