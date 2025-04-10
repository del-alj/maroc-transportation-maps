// Fix 1: Ensure you only have ONE App declaration
import React from 'react';
// import MapView from './components/MapView';
// import RoutePanel from './components/RoutePanel';

// // Should be only ONE default export
// export default function App() { // <-- Remove any duplicate declarations
//   return (
//     <div className="h-screen flex">
//       <MapView />
//       <RoutePanel />
//     </div>
//   );
// }

// App.jsx
import { CityProvider } from './context/CityContext';
import { TramNetworkProvider } from './context/TramNetworkContext';
import MapView from './components/MapView';
import ComingSoon from './components/ComingSoon';
import Header from './components/Header'; // Import the new component
function App() {
  return (
    <CityProvider>
    <TramNetworkProvider>
    <div className="flex flex-col h-screen">
        {/* <Header /> Use the header component */}
        <main className="flex-1 relative">
          {/* <MapView /> */}
          <ComingSoon/>
        </main>
      </div>
    </TramNetworkProvider>
    </CityProvider>
  );
}

export default App;