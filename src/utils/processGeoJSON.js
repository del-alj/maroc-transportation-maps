// src/utils/processGeoJSON.js
export function processGeoJSON(data) {
    const lines = [];
    const stations = [];
  
    data.features.forEach(feature => {
      // Process LineString features
      if (feature.geometry?.type === 'LineString') {
        const coordinates = feature.geometry.coordinates
          ?.filter(coord => Array.isArray(coord) && coord.length >= 2)
          ?.map(coord => [
            parseFloat(coord[1]) || 0,  // Latitude
            parseFloat(coord[0]) || 0   // Longitude
          ]) || [];
  
        lines.push({
          id: feature.properties?.line || 'T0',
          name: feature.properties?.name || 'Unnamed Line',
          color: feature.properties?.color || '#666',
          coordinates
        });
      }
  
      // Process Point features
      if (feature.geometry?.type === 'Point') {
        const rawCoords = feature.geometry?.coordinates || [];
        stations.push({
          id: feature.properties?.id || Date.now().toString(),
          name: feature.properties?.name || 'Unnamed Station',
          coordinates: [
            rawCoords[1] ? parseFloat(rawCoords[1]) : 33.5731,  // Default Casablanca coords
            rawCoords[0] ? parseFloat(rawCoords[0]) : -7.5893
          ],
          lines: feature.properties?.lines || [],
          interchange: feature.properties?.interchange || false
        });
      }
    });
  
    return { lines, stations };
  }