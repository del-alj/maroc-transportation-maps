function GpsButton() {
    return (
      <button
        aria-label="Locate my position on map"
        className="gps-button"
        onClick={handleLocate}
      >
        <span role="img" aria-hidden="true">📍</span>
        <span className="sr-only">Current Location</span>
      </button>
    );
  }
  
  /* Add to your CSS */
//   .sr-only {
//     position: absolute;
//     width: 1px;
//     height: 1px;
//     padding: 0;
//     margin: -1px;
//     overflow: hidden;
//     clip: rect(0, 0, 0, 0);
//     border: 0;
//   }