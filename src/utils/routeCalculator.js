export function findShortestPath(startId, endId, graph) {
    // Dijkstra's algorithm implementation
    const times = {};
    const predecessors = {};
    const pq = new PriorityQueue();
    
    // Initialize data structures
    Object.keys(graph).forEach(station => {
      times[station] = station === startId ? 0 : Infinity;
      pq.enqueue(station, times[station]);
    });
  
    while (!pq.isEmpty()) {
      const currentStation = pq.dequeue().element;
      
      graph[currentStation].connections.forEach(neighbor => {
        const timeToNeighbor = times[currentStation] + graph[currentStation].timeToNext;
        
        if (timeToNeighbor < times[neighbor]) {
          times[neighbor] = timeToNeighbor;
          predecessors[neighbor] = currentStation;
          pq.enqueue(neighbor, timeToNeighbor);
        }
      });
    }
  
    return { path: reconstructPath(predecessors, endId), totalTime: times[endId] };
  }