import * as THREE from "three";

export default function Cubie({ position, colors }) {

  const materials = [
    new THREE.MeshStandardMaterial({ color: colors.right }),
    new THREE.MeshStandardMaterial({ color: colors.left }),
    new THREE.MeshStandardMaterial({ color: colors.top }),
    new THREE.MeshStandardMaterial({ color: colors.bottom }),
    new THREE.MeshStandardMaterial({ color: colors.front }),
    new THREE.MeshStandardMaterial({ color: colors.back }),
  ];

  return (
    <mesh position={position}>
      <boxGeometry args={[0.95, 0.95, 0.95]} />
      <primitive attach="material" object={materials} />
    </mesh>
  );
}