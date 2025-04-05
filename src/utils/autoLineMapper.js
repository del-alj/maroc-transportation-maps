// utils/autoLineMapper.js
import * as turf from '@turf/turf';

export function autoLinkStationsToLines(features, maxDistance = 0.1) { // ~100 meters
  const lines = features.filter(f => f.geometry.type === 'LineString');
  const stations = features.filter(f => f.geometry.type === 'Point');

  return stations?.map(station => {
    const stationPoint = turf.point(station.geometry.coordinates);
    const lineMatches = lines.filter(line => {
      const lineString = turf.lineString(line.geometry.coordinates);
      const nearest = turf.nearestPointOnLine(lineString, stationPoint);
      return nearest.properties.dist < maxDistance;
    });

    return {
      ...station,
      properties: {
        ...station.properties,
        lines: lineMatches?.map(l => l.properties.line)
      }
    };
  });
}