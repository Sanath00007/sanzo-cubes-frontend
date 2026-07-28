import * as THREE from "three";
import { useMemo } from "react";

export default function Cubie({
    id,
    position,
    rotation,
    colors
}) {

  const materials = useMemo(() => ([
    new THREE.MeshStandardMaterial({ color: colors.right }),
    new THREE.MeshStandardMaterial({ color: colors.left }),
    new THREE.MeshStandardMaterial({ color: colors.top }),
    new THREE.MeshStandardMaterial({ color: colors.bottom }),
    new THREE.MeshStandardMaterial({ color: colors.front }),
    new THREE.MeshStandardMaterial({ color: colors.back }),
  ]), [colors]);

  return (
    <mesh
    name={id}
    position={position}
    rotation={rotation}
>
      <boxGeometry args={[0.95, 0.95, 0.95]} />
      <primitive attach="material" object={materials} />
    </mesh>
  );
}