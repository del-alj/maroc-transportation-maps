// Example component usage
import { useTramNetwork } from '../context/TramNetworkContext';

const StationList = () => {
  const { stations, loading, error } = useTramNetwork();

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      {stations?.map(station => (
        <div key={station?.id}>{station?.name}</div>
      ))}
    </div>
  );
};