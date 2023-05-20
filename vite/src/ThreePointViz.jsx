import { Canvas} from '@react-three/fiber';
import { useRef, useState, useContext } from 'react';
import { useLayoutEffect } from 'react';
import { Vector3 } from 'three';
import { OrbitControls } from '@react-three/drei'
import DataPoints from './DataPoints';
import DataLines from './DataLines';
import distinctColors from 'distinct-colors';

function Line({ start, end }) {
    const ref = useRef()
    useLayoutEffect(() => {
      ref.current.geometry.setFromPoints([start, end].map((point) => new Vector3(...point)))
    }, [start, end])
    return (
      <line ref={ref}>
        <bufferGeometry />
        <lineBasicMaterial color="black" />
      </line>
    )
  }


const ThreePointVis = ({data, settings}) => {

  const palette = distinctColors({count: 50, lightMin:50, lightMax: 80, chromaMin:70})

  const [highlightedGroup, setHighlightedGroup] = useState(-1)

  return (
    <Canvas camera={{ position: [0, 0, -5] }}>
    <OrbitControls target={[0,0,0]}></OrbitControls>
      <ambientLight color="#ffffff" intensity={0.1} />
      <hemisphereLight
        color="#ffffff"
        skyColor="#ffffbb"
        groundColor="#080820"
        intensity={1.0}
      />
      <DataPoints data={data} palette={palette} highlightedGroup={highlightedGroup} setHighlightedGroup={setHighlightedGroup} settings={settings}></DataPoints>
      {settings[0].showLines && <DataLines data={data} palette={palette} highlightedGroup={highlightedGroup}></DataLines>}
      <Line start={[-1, 0, 0]} end={[1, 0, 0]} />
      <Line start={[0, -1, 0]} end={[0, 1, 0]} />
      <Line start={[0, 0, -1]} end={[0, 0, 1]} />
    </Canvas>
  );
};

export default ThreePointVis;
