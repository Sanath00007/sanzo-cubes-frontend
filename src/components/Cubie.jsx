import * as THREE from "three";
import { useEffect, useState } from "react";

export default function Cubie({
    id,
    position,
    rotation,
    colors
}) {

  const [materials] = useState(() => ([
      new THREE.MeshPhysicalMaterial({ color: colors.right, roughness: 0.42, metalness: 0.01, clearcoat: 0.24, clearcoatRoughness: 0.55 }),
      new THREE.MeshPhysicalMaterial({ color: colors.left, roughness: 0.42, metalness: 0.01, clearcoat: 0.24, clearcoatRoughness: 0.55 }),
      new THREE.MeshPhysicalMaterial({ color: colors.top, roughness: 0.42, metalness: 0.01, clearcoat: 0.24, clearcoatRoughness: 0.55 }),
      new THREE.MeshPhysicalMaterial({ color: colors.bottom, roughness: 0.42, metalness: 0.01, clearcoat: 0.24, clearcoatRoughness: 0.55 }),
      new THREE.MeshPhysicalMaterial({ color: colors.front, roughness: 0.42, metalness: 0.01, clearcoat: 0.24, clearcoatRoughness: 0.55 }),
      new THREE.MeshPhysicalMaterial({ color: colors.back, roughness: 0.42, metalness: 0.01, clearcoat: 0.24, clearcoatRoughness: 0.55 }),
  ]));

  useEffect(() => {
    materials[0].color.set(colors.right);
    materials[1].color.set(colors.left);
    materials[2].color.set(colors.top);
    materials[3].color.set(colors.bottom);
    materials[4].color.set(colors.front);
    materials[5].color.set(colors.back);

    materials.forEach(material => {
      material.needsUpdate = true;
    });
  }, [colors, materials]);

  return (
    <mesh
    name={id}
    position={position}
    rotation={rotation}
    castShadow
    receiveShadow
>
      <boxGeometry args={[0.965, 0.965, 0.965]} />
      <primitive attach="material" object={materials} />
    </mesh>
  );
}