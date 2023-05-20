import { Html } from '@react-three/drei';
import { useState } from 'react';
import Tooltip from './Tooltip';

function DataPoint({ datum, colorArray, highlightedGroup, setHighlightedGroup, settings}) {
  const [hovered, setHovered] = useState(false);

  const handlePointerOver = () => {
    setHovered(true);
    setHighlightedGroup(datum.group)
  };

  const handlePointerOut = () => {
    setHovered(false);
    setHighlightedGroup(-1)
  };

  const [size, setSize] = useState(Math.random() * (0.05 - 0.025) + 0.02)

  return (
    <mesh position={datum.position} onPointerOver={handlePointerOver} onPointerOut={handlePointerOut}>
      <sphereGeometry attach="geometry" args={[size]} />
      <meshBasicMaterial attach="material" color={(highlightedGroup < 0 || (highlightedGroup == datum.group)) ? colorArray[datum.group].hex(): "gray"} />
      {hovered && (
        <Html style={{ pointerEvents: 'none' }}>
          <Tooltip tip={datum} settings={settings}></Tooltip>
        </Html>
      )}
    </mesh>
  );
}

const DataPoints = ({ data, palette, highlightedGroup, setHighlightedGroup, settings  }) => {
    
  if(data.points){
  return data.points.map((d, index) => <DataPoint settings={settings} datum={d} key={index} colorArray={palette} highlightedGroup={highlightedGroup} setHighlightedGroup={setHighlightedGroup}/>);
  }
};

export default DataPoints;