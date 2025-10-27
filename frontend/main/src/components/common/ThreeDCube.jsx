import React, {useRef} from 'react';
import { useFrame } from '@react-three/fiber';
import { Box } from '@react-three/drei';

const ThreeDCube = () => {
  const cubeRef = useRef(null);

  useFrame((state, delta) => {
    if(cubeRef.current) {
      cubeRef.current.rotation.x += delta * 0.2;
      cubeRef.current.rotation.y += delta * 0.4;
    }
  });

  return (
    <group ref={cubeRef}>
      <Box args={[3, 3, 3]}>
        <meshBasicMaterial
          attach="material-0"
          color='#00ff00'
          transparent
          opacity={0.1}
          wireframe
        ></meshBasicMaterial>

        <meshBasicMaterial
          attach="material-1"
          color='#ff0000'
          transparent
          opacity={0.1}
          wireframe
        ></meshBasicMaterial>

        <meshBasicMaterial
          attach='material-2'
          color='#00bfff'
          transparent
          opacity={0.1}
          wireframe
        ></meshBasicMaterial>

        <meshBasicMaterial
          attach='material-3'
          color='#00ff00'
          transparent
          opacity={0.1}
          wireframe
        ></meshBasicMaterial>

        <meshBasicMaterial
          attach='material-4'
          color='#ff0000'
          transparent
          opacity={0.1}
          wireframe
        ></meshBasicMaterial>

        <meshBasicMaterial
          attach='material-5'
          color='#00bfff'
          transparent
          opacity={0.1}
          wireframe
        ></meshBasicMaterial>                                
      </Box>
    </group>
  );
};

export default ThreeDCube;