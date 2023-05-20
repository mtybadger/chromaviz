import * as React from 'react';
import { extend, useThree, useFrame } from '@react-three/fiber';
import { TrackballControls } from 'three/examples/jsm/controls/TrackballControls';
import * as THREE from 'three';

// extend THREE to include TrackballControls
extend({ TrackballControls });

// key code constants
const ALT_KEY = 18;
const CTRL_KEY = 17;
const CMD_KEY = 91;

const Controls = ({}) => {
  const controls = React.useRef();
  const { camera, gl } = useThree();

  useFrame(() => {
    // update the view as the vis is interacted with
    controls.current.update();
  });

  return (
    <trackballControls
      ref={controls}
      args={[camera, gl.domElement]}
      dynamicDampingFactor={0.1}
      keys={[
        ALT_KEY, // orbit
        CTRL_KEY, // zoom
        CMD_KEY, // pan
      ]}
      mouseButtons={{
        LEFT: THREE.MOUSE.PAN, // make pan the default instead of rotate
        MIDDLE: THREE.MOUSE.ZOOM,
        RIGHT: THREE.MOUSE.ROTATE,
      }}
    />
  );
};

export default Controls;
