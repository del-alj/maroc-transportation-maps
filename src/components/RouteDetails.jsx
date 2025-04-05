export default function RouteDetails({ start, end }) {
    return (
      <div className="route-details">
        <h3>Route Details</h3>
        <p>From: {start}</p>
        <p>To: {end}</p>
        {/* Add route calculation logic here */}
      </div>
    );
  }