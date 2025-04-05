import React, { createContext, useState, useEffect } from 'react';
import { processGeoJSON } from '../utils/processGeoJSON';
import { validateGeoJSON } from '../utils/validateGeoJSON';

// Initialize with default values
export const TramNetworkContext = createContext({
  lines: [],
  stations: [],
  loading: true,
  error: null,
});

export function TramNetworkProvider({ children }) {
  const [state, setState] = useState({
    lines: [],
    stations: [],
    loading: true,
    error: null,
  });

  useEffect(() => {
    const loadData = async () => {
      try {
        const response = await fetch('/tram-data.geojson');
        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
        
        const rawData = await response.json();
        validateGeoJSON(rawData);
        const { lines, stations } = processGeoJSON(rawData);

        setState({
          lines,
          stations,
          loading: false,
          error: null,
        });
      } catch (error) {
        setState({
          lines: [],
          stations: [],
          loading: false,
          error: error.message,
        });
      }
    };

    loadData();
  }, []);

  return (
    <TramNetworkContext.Provider value={state}>
      {children}
    </TramNetworkContext.Provider>
  );
}