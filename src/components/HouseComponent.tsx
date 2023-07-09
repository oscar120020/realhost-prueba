import { Preload } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import { LoadModel } from "./LoadModel";
import { HouseModel } from "../3d-models";

interface Props {
  selectedWall: string;
}

export const HouseComponent = ({ selectedWall }: Props) => {
  return (
    <Canvas
      camera={{
        position: [0, 0, 30],
        fov: 13,
      }}
    >
      <Suspense fallback={<LoadModel />}>
        <HouseModel selectedWall={selectedWall} />
      </Suspense>
      <pointLight position={[-10, 20, -10]} intensity={0.7} />
      <directionalLight position={[10, 10, 10]} intensity={1.3} color="#fff" />
      <ambientLight intensity={0.5} color="#fff" />
      <Preload all />
    </Canvas>
  );
};
