export default function StationSelector({ label, selected, onChange }) {
  return (
    <div className="station-selector">
      <label>{label}</label>
      <select 
        value={selected || ''} 
        onChange={(e) => onChange(e.target.value)}
        className="w-full p-2 border rounded"
      >
        <option value="">Select a station</option>
        {/* Add your station options here */}
      </select>
    </div>
  );
}