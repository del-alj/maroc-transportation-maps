// src/utils/validateGeoJSON.js
export function validateGeoJSON(data) {
    if (!data?.features) {
      throw new Error('Invalid GeoJSON: Missing features array');
    }
  
    data.features.forEach((feature, index) => {
      if (!feature.geometry) {
        console.warn(`Feature at index ${index} has no geometry`);
        return;
      }
      
      if (feature.geometry.type === 'LineString' && !feature.geometry.coordinates) {
        console.warn(`LineString feature at index ${index} has no coordinates`);
      }
  
      if (feature.geometry.type === 'Point' && !feature.properties?.lines) {
        console.warn(`Point feature at index ${index} has no lines property`);
      }
    });
  }