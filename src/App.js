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
import { TramNetworkProvider } from './context/TramNetworkContext';
import MapView from './components/MapView';
import ComingSoon from './components/ComingSoon';
function App() {
  return (
    <TramNetworkProvider>
      <MapView />
      {/* <ComingSoon/> */}
    </TramNetworkProvider>
  );
}

export default App;