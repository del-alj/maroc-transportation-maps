import { useState } from 'react';
import RoutePlanner from './RoutePlanner';

function App() {
  const [showRoutePlanner, setShowRoutePlanner] = useState(false);

  return (
    <div>
      <button onClick={() => setShowRoutePlanner(true)}>
        Plan Route
      </button>
      
      {showRoutePlanner && (
        <RoutePlanner 
          onClose={() => setShowRoutePlanner(false)}
          onRouteCalculate={(data) => console.log('Route data:', data)}
        />
      )}
    </div>
  );
}