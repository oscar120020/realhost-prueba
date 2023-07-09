import { useThree, useFrame } from "@react-three/fiber";
import { useRef, useState, useEffect } from "react";
import * as THREE from "three";
import { Mesh } from "three"

export type Walls = "wall1" | "wall2" | "wall3" | "wall4";

export const useModelControl = (selectedWall: Walls) => {
  const wall1Ref = useRef<Mesh>(null);
  const wall2Ref = useRef<Mesh>(null);
  const wall3Ref = useRef<Mesh>(null);
  const wall4Ref = useRef<Mesh>(null);
  const lineRef = useRef<THREE.Line>();
  const mainRef = useRef<THREE.Group>(null);
  const currentRotation = useRef(0);
  const [toRotate, setToRotate] = useState(0);

  const { camera } = useThree();
  camera.position.y = 1.5;

  const generateEdgesGeometry = (mesh: Mesh) => {
    const positions = (
      mesh.geometry.attributes.position as THREE.BufferAttribute
    ).array;
    const indices = mesh.geometry.index?.array || [];
    const edgeIndices = [];

    for (let i = 0; i < indices.length; i += 3) {
      const i1 = indices[i];
      const i2 = indices[i + 1];
      const i3 = indices[i + 2];

      edgeIndices.push(i1, i2);
      edgeIndices.push(i2, i3);
      edgeIndices.push(i3, i1);
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geometry.setIndex(edgeIndices);

    return geometry;
  };

  useFrame(() => {
    const mesh = mainRef.current;
    if (mesh) {
      currentRotation.current += (toRotate - currentRotation.current) * 0.1;
      mesh.rotation.y = currentRotation.current;
    }
  });

  useEffect(() => {
    if (!selectedWall) return;

    const refObjec = {
      wall1: wall1Ref.current,
      wall2: wall2Ref.current,
      wall3: wall3Ref.current,
      wall4: wall4Ref.current,
    };
    const mesh = refObjec[selectedWall as Walls];
    if (!mesh) return;

    const rotatePositions = {
      wall1: 0,
      wall2: 4.8,
      wall3: 3.1,
      wall4: 1.5,
    };
    const rotationNumber = rotatePositions[selectedWall as Walls];
    setToRotate(rotationNumber);

    if (lineRef.current) {
      wall1Ref.current?.remove(lineRef.current);
      wall2Ref.current?.remove(lineRef.current);
      wall3Ref.current?.remove(lineRef.current);
      wall4Ref.current?.remove(lineRef.current);
    }
    const edges = generateEdgesGeometry(mesh);
    const line = new THREE.LineSegments(
      edges,
      new THREE.LineBasicMaterial({ color: "green", linewidth: 10 })
    );
    mesh.add(line);
    lineRef.current = line;
  }, [selectedWall]);

  return {
    wall1Ref,
    wall2Ref,
    wall3Ref,
    wall4Ref,
    mainRef,
  };
};
