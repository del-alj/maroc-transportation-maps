import React, { createContext, useContext, useState, useEffect } from 'react';
import { processGeoJSON } from '../utils/processGeoJSON';
import { useCity } from '../context/CityContext';

export const TramNetworkContext = createContext();

export function TramNetworkProvider({ children }) {
  const [lines, setLines] = useState([]);
  const [stations, setStations] = useState([]);
  const [loading, setLoading] = useState(true);
  // Safely get city context with fallback
  const cityContext = useCity();
  const currentCity = cityContext?.currentCity || 'Casablanca';
  useEffect(() => {
     // const data = await
  // fetch('https://overpass-api.de/api/interpreter?data=[out:json][timeout:25];(node["railway"="tram_stop"]({{bbox}});rel(bn)["route"="tram"]["type"="route"]; ); out geom;>;')
  // .then(res => res.json());
    const loadData = async () => {
      try {
        setLoading(true);
        const filename = currentCity === 'Casablanca'
          ? '/tram-data-casa.geojson'
          : '/tram-data-rabat.geojson';

        const response = await fetch(filename);
        const rawData = await response.json();
        const processedData = processGeoJSON(rawData);
        
        setLines(processedData.lines);
        setStations(processedData.stations);
      } catch (error) {
        console.error('Error loading data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [currentCity]);

  return (
    <TramNetworkContext.Provider value={{ lines, stations, loading }}>
      {children}
    </TramNetworkContext.Provider>
  );
}