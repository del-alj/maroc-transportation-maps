// TramNetworkContext.jsx
// import { processGeoJSON } from '../utils/processGeoJSON';
// import { processOverpassData } from '../utils/processOverpass';

// // Choose processor based on data source
// const processor = dataSource === 'overpass' 
//   ? processOverpassData 
//   : processGeoJSON;



  import React, { createContext, useContext, useState, useEffect } from 'react';
import { processGeoJSON } from '../utils/processGeoJSON';

// Create context
export const TramNetworkContext = createContext();

export function TramNetworkProvider({ children }) {
  const [lines, setLines] = useState([]);
  const [stations, setStations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/tram-data.geojson')
      .then(response => response.json())
      .then(rawData => {
        const processedData = processGeoJSON(rawData);
        setLines(processedData.lines);
        setStations(processedData.stations);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error loading data:', error);
        setLoading(false);
      });
  }, []);

  return (
    <TramNetworkContext.Provider value={{ lines, stations, loading }}>
      {children}
    </TramNetworkContext.Provider>
  );
}

// Custom hook for consuming context
export function useTramNetwork() {
  const context = useContext(TramNetworkContext);
  if (!context) {
    throw new Error('useTramNetwork must be used within a TramNetworkProvider');
  }
  return context;
}