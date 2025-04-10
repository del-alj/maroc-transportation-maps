// context/CityContext.jsx
import { createContext, useState, useContext } from 'react';

export const CityContext = createContext();

export function CityProvider({ children }) {
  const [currentCity, setCurrentCity] = useState('Casablanca');

  return (
    <CityContext.Provider value={{ currentCity, setCurrentCity }}>
      {children}
    </CityContext.Provider>
  );
}

export function useCity() {
  return useContext(CityContext);
}