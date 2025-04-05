// components/TramNetwork.jsx
import { mapStationsToLines } from '../utils/lineStationMapper';

function TramNetwork() {
  const [networkData, setNetworkData] = useState(null);

  useEffect(() => {
    fetch('/tram-data.geojson')
      .then(res => res.json())
      .then(data => {
        const structuredData = mapStationsToLines(data?.features);
        setNetworkData(structuredData);
      });
  }, []);

  return (
    <div>
      {networkData && Object.entries(networkData?.lines).map(([lineCode, line]) => (
        <div key={lineCode}>
          <h3>{line?.name}</h3>
          <p>Stations: {line?.stations.length}</p>
        </div>
      ))}
    </div>
  );
}