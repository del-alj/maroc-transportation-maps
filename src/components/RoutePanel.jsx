import { useState } from 'react';

// Fix 2: Add missing imports at the top
import StationSelector from './StationSelector';
import RouteDetails from './RouteDetails';



export default function RoutePanel() {
  const [startStation, setStartStation] = useState(null);
  const [endStation, setEndStation] = useState(null);

  return (
    <div className="w-96 bg-white p-4 border-l shadow-lg">
      <h2 className="text-xl font-bold mb-4">Plan Your Trip</h2>
      <div className="space-y-4">
        <StationSelector 
          label="From"
          selected={startStation}
          onChange={setStartStation}
        />
        <StationSelector 
          label="To"
          selected={endStation}
          onChange={setEndStation}
        />
        {startStation && endStation && (
          <RouteDetails 
            start={startStation}
            end={endStation}
          />
        )}
      </div>
    </div>
  );
}