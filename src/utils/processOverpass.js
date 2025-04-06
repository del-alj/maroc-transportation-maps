// src/utils/processOverpass.js
export function processOverpassData(data) {
  // Initialize empty arrays
  const processedLines = [];
  const processedStations = [];

  // Process stations (nodes)
  const stationsMap = new Map();
  data.elements
    .filter(element => element.type === 'node' && element.tags?.railway === 'tram_stop')
    .forEach(node => {
      const stationKey = `${node.lat.toFixed(5)}_${node.lon.toFixed(5)}`;
      if (!stationsMap.has(stationKey)) {
        stationsMap.set(stationKey, {
          id: node.id,
          name: node.tags.name || 'Unnamed Station',
          lat: node.lat,
          lon: node.lon
        });
      }
    });
  processedStations.push(...stationsMap.values());

  // Process lines (relations)
  const linesMap = new Map();
  data.elements
    .filter(element => element.type === 'relation' && element.tags?.route === 'tram')
    .forEach(relation => {
      if (!linesMap.has(relation.id)) {
        const line = {
          id: relation.id,
          name: relation.tags.ref || relation.tags.name || 'Unnamed Line',
          color: relation.tags.colour || '#666',
          coordinates: []
        };

        // Get geometry from relation members
        relation.members.forEach(member => {
          if (member.type === 'way') {
            const way = data.elements.find(e => e.id === member.ref);
            if (way) {
              line.coordinates.push(
                ...way.geometry.map(pt => [pt.lat, pt.lon])
              );
            }
          }
        });

        linesMap.set(relation.id, line);
      }
    });
  processedLines.push(...linesMap.values());

  return {
    lines: processedLines,
    stations: processedStations
  };
}