import React, { Suspense } from "react";
import { Canvas } from "react-three-fiber";
import { OrbitControls, Environment, useGLTF } from "@react-three/drei";

const Model = ({ modelPath }) => {
  const { scene } = useGLTF(modelPath);
  return <primitive object={scene} scale={[2, 2, 2]} position={[0, -1.5, 0]} />;
};

const Loader = () => (
  <mesh>
    <boxGeometry />
    <meshBasicMaterial color="gray" />
  </mesh>
);

const ThreeDViewer = ({ modelPath }) => {
  return (
    <Canvas shadows camera={{ position: [0, 3, 6], fov: 40 }}>
      <ambientLight intensity={0.7} />
      <directionalLight castShadow position={[10, 10, 10]} intensity={1} />
      <Suspense fallback={<Loader />}>
        <Model modelPath={modelPath} />
      </Suspense>
      <OrbitControls enablePan={true} enableZoom={true} enableRotate={true} />
      <Environment preset="sunset" />
    </Canvas>
  );
};

export default ThreeDViewer;
