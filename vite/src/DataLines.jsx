import { useEffect, useLayoutEffect, useRef, useState } from "react"
import * as THREE from "three"
import { ConvexGeometry } from 'three/addons/geometries/ConvexGeometry.js';

function Line({ start, end, color }) {
  const ref = useRef()
  useLayoutEffect(() => {
    ref.current.geometry.setFromPoints([start, end].map((point) => new THREE.Vector3(...point)))
  }, [start, end])
  return (
    <line ref={ref}>
      <bufferGeometry />
      <lineBasicMaterial color={color} />
    </line>
  )
}

const DataLines = ({ data, palette, highlightedGroup }) => {

  function organizePointsByGroup(points) {
    const groupedPoints = new Map();
  
    // Iterate over the points and group them by the group value
    for (const point of points) {
      const { group } = point;
  
      // If the group doesn't exist as a key in the map, create a new array
      if (!groupedPoints.has(group)) {
        groupedPoints.set(group, []);
      }
  
      // Push the current point into the array associated with its group
      groupedPoints.get(group).push(point);
    }
  
    // Convert the map object into an array of arrays
    const result = Array.from(groupedPoints.values());
  
    return result;
  }

  function calculateConvexHull(points) {
        const vertices = []

        const color = points[0].group
      
        // Add points to the geometry
        points.forEach((point) => {
          vertices.push(new THREE.Vector3(point.position[0], point.position[1], point.position[2]));
        });
      
        // Calculate the convex hull
        const convexHull = new ConvexGeometry(vertices);
    // Get the attributes from the convex hull geometry
    const positionAttribute = convexHull.getAttribute('position');
    const vertexCount = convexHull.getAttribute('position').count;

    // Collect the start and end positions of the lines
    const lines = [[]];

    // Iterate over the vertices in sets of 3
    for (let i = 0; i < vertexCount; i += 3) {
      const start = new THREE.Vector3().fromBufferAttribute(positionAttribute, i);
      const middle = new THREE.Vector3().fromBufferAttribute(positionAttribute, i + 1);
      const end = new THREE.Vector3().fromBufferAttribute(positionAttribute, i + 2);

      lines.push([[start.x, start.y, start.z], [middle.x, middle.y, middle.z], color]);

      lines.push([[middle.x, middle.y, middle.z], [end.x, end.y, end.z], color]);

      lines.push([[end.x, end.y, end.z], [start.x, start.y, start.z], color]);
    }

    return lines;
  }

  var [lineComponents, setLineComponents] = useState([])

  useEffect(() => {
    if(data.points){
      setLineComponents([])
      const groups = organizePointsByGroup(data.points)
      var lines = []
      groups.forEach((group) => {
        if(group.length > 5){
          lines = (lines.concat(calculateConvexHull(group)))
        }
      })
      for (let index = 0; index < lines.length; index++) {
        const d = lines[index];
        if(d.length > 2){
          setLineComponents(lineComponents => [...lineComponents, <Line start={d[0]} end={d[1]} color={(highlightedGroup < 0 || (highlightedGroup == d[2])) ? palette[d[2]].hex(): "gray"} key={index} />])
        }
      }
  }}, [data.points, highlightedGroup])
    
    return lineComponents;
  }

export default DataLines;