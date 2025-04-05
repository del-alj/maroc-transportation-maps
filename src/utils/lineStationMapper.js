// utils/lineStationMapper.js
export function mapStationsToLines(features) {
    const result = {
      lines: {},
      stations: {}
    };
  
    // First pass: Process lines
    features.filter(f => f.geometry.type === 'LineString').forEach(lineFeature => {
      const lineCode = lineFeature.properties.line;
      result.lines[lineCode] = {
        ...lineFeature.properties,
        stations: [],
        coordinates: lineFeature.geometry.coordinates
      };
    });
  
    // Second pass: Process stations
    features.filter(f => f.geometry.type === 'Point').forEach(stationFeature => {
      const station = {
        ...stationFeature.properties,
        coordinates: stationFeature.geometry.coordinates
      };
      
      // Validate line associations
      station.lines.forEach(lineCode => {
        if (result.lines[lineCode]) {
          result.lines[lineCode].stations.push(station);
          result.stations[station.id] = station;
        }
      });
    });
  
    return result;
  }