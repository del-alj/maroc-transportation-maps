export function processGeoJSON(data) {
  const stationMap = new Map();
  const lineMap = new Map();
  const LINE_COLORS = { // Default color fallbacks
    'T1': '#F38230',
    'T2': '#0078BF',
    'T3': '#A16376',
    'T4': '#6797BA',
    '1': '#F955A6', //L1 
    '2': '#9E6DB2' //L2
  };

  // First pass: Process all lines to create color reference
  data.features.forEach(feature => {
    if (feature.geometry?.type === 'LineString' && feature.properties?.ref) {
      const lineId = feature.properties.ref;
      const coordinates = feature.geometry.coordinates
        .filter(coord => coord?.length >= 2)
        .map(coord => [
          parseFloat(coord[1]),  // lat
          parseFloat(coord[0])   // lng
        ])
        .filter(coord => !isNaN(coord[0]) && !isNaN(coord[1]));

      if (coordinates.length > 0) {
        lineMap.set(lineId, {
          id: lineId,
          name: feature.properties.name || `Line ${lineId}`,
          color: feature.properties.colour || LINE_COLORS[lineId] || '#6797BA',
          coordinates
        });
        console.log(feature.properties.name, 'this is lin', lineId)
      }
    }
  });

  // Second pass: Process stations with line color reference
  data.features.forEach(feature => {
    if (feature.geometry?.type === 'Point' && feature.properties.railway === 'tram_stop') {
      const coords = feature.geometry?.coordinates;
      if (!coords || coords.length < 2) return;

      // Normalize station name and coordinates
      const stationName = (feature.properties.name || 'Unnamed Station').trim().toLowerCase();
      const coordPrecision = 4; // Reduced precision to group nearby stops
      const lat = parseFloat(coords[1].toFixed(coordPrecision));
      const lng = parseFloat(coords[0].toFixed(coordPrecision));

      // Create station groups by name
      if (!stationMap.has(stationName)) {
        stationMap.set(stationName, {
          ids: new Set(),
          name: feature.properties.name || 'Unnamed Station',
          coordinates: [lat, lng],
          lines: new Set(),
          directions: new Set(),
          count: 1
        });
      } else {
        // Average coordinates for grouped stations
        const existing = stationMap.get(stationName);
        const newCount = existing.count + 1;
        existing.coordinates = [
          (existing.coordinates[0] * existing.count + lat) / newCount,
          (existing.coordinates[1] * existing.count + lng) / newCount
        ];
        existing.count = newCount;
      }

      const station = stationMap.get(stationName);
      station.ids.add(feature.id);

      // Process relations using lineMap colors
      feature.properties['@relations']?.forEach(rel => {
        const lineId = rel.reltags.ref;
        if (lineId && lineMap.has(lineId)) {
          const line = lineMap.get(lineId);
          station.lines.add(lineId);
          station.directions.add(`${rel.reltags.from} → ${rel.reltags.to}`);
        }
      });
    }
  });

  return {
    stations: Array.from(stationMap.values()).map(s => ({
      id: Array.from(s.ids).join('|'), // Preserve original IDs
      name: s.name,
      coordinates: s.coordinates,
      lines: Array.from(s.lines).map(lineId => ({
        id: lineId,
        color: lineMap.get(lineId)?.color || '#666'
      })),
      directions: Array.from(s.directions)
    })),
    lines: Array.from(lineMap.values())
  };
}