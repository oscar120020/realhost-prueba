import * as THREE from "three";
import { Html, useGLTF } from "@react-three/drei";
import { GLTF } from "three-stdlib";
import { GroupProps } from "@react-three/fiber";
import { Walls, useModelControl } from "../hooks";

type GLTFResult = GLTF & {
  nodes: {
    Mesh: THREE.Mesh;
    Mesh_1: THREE.Mesh;
    Mesh_2: THREE.Mesh;
    Mesh_3: THREE.Mesh;
    Mesh_4: THREE.Mesh;
    Mesh_5: THREE.Mesh;
    Mesh_6: THREE.Mesh;
    Mesh_7: THREE.Mesh;
    Mesh001: THREE.Mesh;
    Mesh001_1: THREE.Mesh;
    Mesh001_2: THREE.Mesh;
    LoftedBarn_6Wall_10x12_None_Wall1: THREE.Mesh;
    LoftedBarn_6Wall_10x12_None_Wall2: THREE.Mesh;
    LoftedBarn_6Wall_10x12_None_Wall3: THREE.Mesh;
    LoftedBarn_6Wall_10x12_None_Wall4: THREE.Mesh;
  };
  materials: {
    Siding_LPSmartPanelSiding: THREE.MeshStandardMaterial;
    Siding_BoardandBatten: THREE.MeshStandardMaterial;
    Roofing_Shingles_DesertTan: THREE.MeshStandardMaterial;
    Wood_Trim_Interior: THREE.MeshStandardMaterial;
    Wood_InteriorFloor: THREE.MeshStandardMaterial;
    Wood_Trim: THREE.MeshStandardMaterial;
    Metal_Interior: THREE.MeshStandardMaterial;
    Metal_Exterior: THREE.MeshStandardMaterial;
    Wood_Interior: THREE.MeshStandardMaterial;
  };
};

interface Props extends GroupProps {
  selectedWall: string;
}

export function HouseModel({ selectedWall, ...props }: Props) {
  const { nodes, materials } = useGLTF("/Barn_Testing.glb") as GLTFResult;

  const { mainRef, wall1Ref, wall2Ref, wall3Ref, wall4Ref } = useModelControl(
    selectedWall as Walls
  );

  return (
    <group ref={mainRef} {...props} dispose={null}>
      <group scale={[0.008, 0.011, 0.01]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Mesh.geometry}
          material={materials.Siding_LPSmartPanelSiding}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Mesh_1.geometry}
          material={materials.Siding_BoardandBatten}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Mesh_2.geometry}
          material={materials.Roofing_Shingles_DesertTan}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Mesh_3.geometry}
          material={materials.Wood_Trim_Interior}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Mesh_4.geometry}
          material={materials.Wood_InteriorFloor}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Mesh_5.geometry}
          material={materials.Wood_Trim}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Mesh_6.geometry}
          material={materials.Metal_Interior}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Mesh_7.geometry}
          material={materials.Metal_Exterior}
        />
      </group>
      <group scale={[0.008, 0.011, 0.01]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Mesh001.geometry}
          material={materials.Wood_Trim_Interior}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Mesh001_1.geometry}
          material={materials.Wood_Interior}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Mesh001_2.geometry}
          material={materials.Wood_Trim}
        />
        <mesh
          ref={wall3Ref}
          castShadow
          receiveShadow
          geometry={nodes.LoftedBarn_6Wall_10x12_None_Wall1.geometry}
          material={materials.Siding_LPSmartPanelSiding}
          userData={{ name: "BackWall" }}
        >
          {selectedWall === "wall3" && (
            <Html
              transform
              occlude
              position={[-10, 120, 0]}
              rotation={[0, 3.1, 0]}
            >
              <h1 style={{ fontSize: 1000, color: "red" }}>BACK</h1>
            </Html>
          )}
        </mesh>
        <mesh
          ref={wall2Ref}
          castShadow
          receiveShadow
          geometry={nodes.LoftedBarn_6Wall_10x12_None_Wall2.geometry}
          material={materials.Siding_LPSmartPanelSiding}
          userData={{ name: "RightWall" }}
        >
          {selectedWall === "wall2" && (
            <Html
              transform
              occlude
              position={[200, 110, 190]}
              rotation={[0, 1.5, 0]}
            >
              <h1 style={{ fontSize: 1000, color: "red" }}>RIGHT</h1>
            </Html>
          )}
        </mesh>
        <mesh
          ref={wall1Ref}
          castShadow
          receiveShadow
          geometry={nodes.LoftedBarn_6Wall_10x12_None_Wall3.geometry}
          material={materials.Siding_LPSmartPanelSiding}
          userData={{ name: "FrontWall" }}
        >
          {selectedWall === "wall1" && (
            <Html transform occlude position={[10, 120, 380]}>
              <h1 style={{ fontSize: 1000, color: "red" }}>FRONT</h1>
            </Html>
          )}
        </mesh>
        <mesh
          ref={wall4Ref}
          castShadow
          receiveShadow
          geometry={nodes.LoftedBarn_6Wall_10x12_None_Wall4.geometry}
          material={materials.Siding_LPSmartPanelSiding}
          userData={{ name: "LeftWall" }}
        >
          {selectedWall === "wall4" && (
            <Html
              transform
              occlude
              position={[-200, 110, 200]}
              rotation={[0, 4.7, 0]}
            >
              <h1 style={{ fontSize: 1000, color: "red" }}>LEFT</h1>
            </Html>
          )}
        </mesh>
      </group>
    </group>
  );
}

useGLTF.preload("/Barn_Testing.glb");
