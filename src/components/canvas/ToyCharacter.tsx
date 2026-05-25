"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { RoundedBox, Torus } from "@react-three/drei";

export interface ToyCharacterProps {
  color: string;
  hoodieColor?: string;
  hasGlasses?: boolean;
  hasHat?: boolean;
  hasChain?: boolean;
  isActive?: boolean;
  scale?: number;
}

export default function ToyCharacter({ 
  color, 
  hoodieColor = "#222222",
  hasGlasses = true,
  hasHat = false,
  hasChain = true,
  isActive = false,
  scale = 1
}: ToyCharacterProps) {
  const groupRef = useRef<THREE.Group>(null);
  const headRef = useRef<THREE.Group>(null);
  const leftArmRef = useRef<THREE.Group>(null);
  const rightArmRef = useRef<THREE.Group>(null);

  // Materials
  const skinMaterial = useMemo(() => new THREE.MeshPhysicalMaterial({
    color: color,
    metalness: 0.1,
    roughness: 0.15,
    clearcoat: 1.0,
    clearcoatRoughness: 0.1,
  }), [color]);

  const clothMaterial = useMemo(() => new THREE.MeshStandardMaterial({
    color: hoodieColor,
    roughness: 0.9,
    metalness: 0.05,
  }), [hoodieColor]);

  const shoeMaterial = useMemo(() => new THREE.MeshPhysicalMaterial({
    color: "#ffffff",
    roughness: 0.3,
    metalness: 0.1,
    clearcoat: 0.5,
  }), []);

  const shoeDetailMaterial = useMemo(() => new THREE.MeshStandardMaterial({
    color: color,
    roughness: 0.5,
  }), [color]);

  const goldMaterial = useMemo(() => new THREE.MeshStandardMaterial({
    color: "#FFD700",
    metalness: 1,
    roughness: 0.2,
  }), []);

  const glassMaterial = useMemo(() => new THREE.MeshPhysicalMaterial({
    color: "#111111",
    metalness: 0.8,
    roughness: 0.1,
    transmission: 0.8,
    thickness: 0.5,
  }), []);

  // Idle animation
  useFrame((state, delta) => {
    if (groupRef.current) {
      if (isActive) {
        const t = state.clock.getElapsedTime();
        // Smooth floating with lerp
        const targetY = Math.sin(t * 1.5) * 0.08;
        groupRef.current.position.y = THREE.MathUtils.lerp(groupRef.current.position.y, targetY, delta * 2);
        
        if (headRef.current) {
          headRef.current.rotation.y = THREE.MathUtils.lerp(headRef.current.rotation.y, Math.sin(t * 0.8) * 0.15, delta * 2);
          headRef.current.rotation.x = THREE.MathUtils.lerp(headRef.current.rotation.x, Math.sin(t * 1.2) * 0.05, delta * 2);
        }
        if (leftArmRef.current) {
          leftArmRef.current.rotation.x = THREE.MathUtils.lerp(leftArmRef.current.rotation.x, Math.sin(t * 2) * 0.05, delta * 2);
          leftArmRef.current.rotation.z = THREE.MathUtils.lerp(leftArmRef.current.rotation.z, 0.1, delta * 2); // Slightly raised
        }
        if (rightArmRef.current) {
          rightArmRef.current.rotation.x = THREE.MathUtils.lerp(rightArmRef.current.rotation.x, Math.sin(t * 2 + Math.PI) * 0.05, delta * 2);
          rightArmRef.current.rotation.z = THREE.MathUtils.lerp(rightArmRef.current.rotation.z, -0.1, delta * 2);
        }
      } else {
        // Return to neutral
        groupRef.current.position.y = THREE.MathUtils.lerp(groupRef.current.position.y, 0, delta * 2);
        if (headRef.current) {
          headRef.current.rotation.y = THREE.MathUtils.lerp(headRef.current.rotation.y, 0, delta * 2);
          headRef.current.rotation.x = THREE.MathUtils.lerp(headRef.current.rotation.x, 0, delta * 2);
        }
        if (leftArmRef.current) {
          leftArmRef.current.rotation.x = THREE.MathUtils.lerp(leftArmRef.current.rotation.x, 0, delta * 2);
          leftArmRef.current.rotation.z = THREE.MathUtils.lerp(leftArmRef.current.rotation.z, 0, delta * 2);
        }
        if (rightArmRef.current) {
          rightArmRef.current.rotation.x = THREE.MathUtils.lerp(rightArmRef.current.rotation.x, 0, delta * 2);
          rightArmRef.current.rotation.z = THREE.MathUtils.lerp(rightArmRef.current.rotation.z, 0, delta * 2);
        }
      }
    }
  });

  return (
    <group ref={groupRef} scale={scale} dispose={null}>
      {/* Head Group */}
      <group ref={headRef} position={[0, 1.8, 0]}>
        {/* Main Head */}
        <RoundedBox args={[1.3, 1.2, 1.2]} radius={0.3} smoothness={4} material={skinMaterial} castShadow receiveShadow />
        
        {/* Ears/Knobs */}
        <mesh position={[-0.7, 0.4, 0]} material={skinMaterial} castShadow>
          <sphereGeometry args={[0.3, 32, 32]} />
        </mesh>
        <mesh position={[0.7, 0.4, 0]} material={skinMaterial} castShadow>
          <sphereGeometry args={[0.3, 32, 32]} />
        </mesh>

        {/* Eyes (X-shape for streetwear toy look) */}
        <group position={[-0.3, 0.1, 0.61]}>
          <mesh rotation={[0, 0, Math.PI / 4]} material={clothMaterial} castShadow>
            <capsuleGeometry args={[0.03, 0.2, 4, 8]} />
          </mesh>
          <mesh rotation={[0, 0, -Math.PI / 4]} material={clothMaterial} castShadow>
            <capsuleGeometry args={[0.03, 0.2, 4, 8]} />
          </mesh>
        </group>
        <group position={[0.3, 0.1, 0.61]}>
          <mesh rotation={[0, 0, Math.PI / 4]} material={clothMaterial} castShadow>
            <capsuleGeometry args={[0.03, 0.2, 4, 8]} />
          </mesh>
          <mesh rotation={[0, 0, -Math.PI / 4]} material={clothMaterial} castShadow>
            <capsuleGeometry args={[0.03, 0.2, 4, 8]} />
          </mesh>
        </group>

        {/* Accessories: Glasses */}
        {hasGlasses && (
          <group position={[0, 0.1, 0.65]}>
            <RoundedBox args={[1.1, 0.4, 0.1]} radius={0.05} material={glassMaterial} castShadow />
            <mesh position={[0, 0.15, 0]} material={clothMaterial}>
              <boxGeometry args={[1.2, 0.05, 0.12]} />
            </mesh>
          </group>
        )}

        {/* Accessories: Hat (Beanie) */}
        {hasHat && (
          <group position={[0, 0.5, 0]}>
            <mesh material={clothMaterial} castShadow>
              <cylinderGeometry args={[0.65, 0.65, 0.5, 32]} />
            </mesh>
            <mesh position={[0, 0.25, 0]} material={clothMaterial} castShadow>
              <sphereGeometry args={[0.65, 32, 16, 0, Math.PI * 2, 0, Math.PI / 2]} />
            </mesh>
          </group>
        )}
      </group>

      {/* Body / Oversized Hoodie */}
      <group position={[0, 0.6, 0]}>
        {/* Hoodie Main Torso */}
        <RoundedBox args={[1.4, 1.4, 1.1]} radius={0.3} smoothness={4} material={clothMaterial} castShadow receiveShadow />
        {/* Hoodie Pocket */}
        <RoundedBox position={[0, -0.3, 0.5]} args={[0.8, 0.5, 0.2]} radius={0.1} material={clothMaterial} castShadow receiveShadow />
        {/* Hoodie Collar/Neck */}
        <mesh position={[0, 0.8, 0]} rotation={[Math.PI / 8, 0, 0]} material={clothMaterial} castShadow>
          <torusGeometry args={[0.5, 0.15, 16, 32]} />
        </mesh>
        {/* Hoodie Strings */}
        <mesh position={[-0.2, 0.6, 0.6]} rotation={[0, 0, 0.2]} material={shoeMaterial} castShadow>
          <capsuleGeometry args={[0.02, 0.3, 4, 8]} />
        </mesh>
        <mesh position={[0.2, 0.6, 0.6]} rotation={[0, 0, -0.2]} material={shoeMaterial} castShadow>
          <capsuleGeometry args={[0.02, 0.3, 4, 8]} />
        </mesh>
      </group>

      {/* Accessories: Gold Chain */}
      {hasChain && (
        <group position={[0, 0.8, 0]} rotation={[Math.PI / 6, 0, 0]}>
          <Torus args={[0.65, 0.05, 16, 64]} material={goldMaterial} castShadow />
          <mesh position={[0, -0.65, 0.1]} material={goldMaterial} castShadow>
            <boxGeometry args={[0.2, 0.3, 0.05]} />
          </mesh>
        </group>
      )}

      {/* Left Arm (Hoodie Sleeve) */}
      <group ref={leftArmRef} position={[-0.9, 1.1, 0]}>
        {/* Sleeve */}
        <mesh position={[0, -0.5, 0]} material={clothMaterial} castShadow receiveShadow>
          <capsuleGeometry args={[0.25, 0.7, 16, 16]} />
        </mesh>
        {/* Hand */}
        <mesh position={[0, -1.0, 0]} material={skinMaterial} castShadow receiveShadow>
          <sphereGeometry args={[0.2, 32, 32]} />
        </mesh>
      </group>

      {/* Right Arm (Hoodie Sleeve) */}
      <group ref={rightArmRef} position={[0.9, 1.1, 0]}>
        {/* Sleeve */}
        <mesh position={[0, -0.5, 0]} material={clothMaterial} castShadow receiveShadow>
          <capsuleGeometry args={[0.25, 0.7, 16, 16]} />
        </mesh>
        {/* Hand */}
        <mesh position={[0, -1.0, 0]} material={skinMaterial} castShadow receiveShadow>
          <sphereGeometry args={[0.2, 32, 32]} />
        </mesh>
      </group>

      {/* Legs */}
      <group position={[-0.35, -0.3, 0]}>
        {/* Leg */}
        <mesh position={[0, -0.4, 0]} material={skinMaterial} castShadow receiveShadow>
          <capsuleGeometry args={[0.2, 0.6, 16, 16]} />
        </mesh>
        {/* Sneaker */}
        <group position={[0, -0.85, 0.1]}>
          {/* Sole */}
          <RoundedBox position={[0, -0.15, 0]} args={[0.55, 0.1, 0.8]} radius={0.02} material={shoeMaterial} castShadow />
          {/* Main Shoe */}
          <RoundedBox position={[0, 0.05, 0]} args={[0.5, 0.25, 0.7]} radius={0.1} material={shoeMaterial} castShadow />
          {/* Shoe Detail/Accent */}
          <mesh position={[0, 0.1, 0.2]} material={shoeDetailMaterial}>
            <boxGeometry args={[0.4, 0.1, 0.4]} />
          </mesh>
          {/* Tongue */}
          <mesh position={[0, 0.2, -0.1]} rotation={[Math.PI / 4, 0, 0]} material={shoeMaterial}>
            <boxGeometry args={[0.3, 0.3, 0.05]} />
          </mesh>
        </group>
      </group>

      <group position={[0.35, -0.3, 0]}>
        {/* Leg */}
        <mesh position={[0, -0.4, 0]} material={skinMaterial} castShadow receiveShadow>
          <capsuleGeometry args={[0.2, 0.6, 16, 16]} />
        </mesh>
        {/* Sneaker */}
        <group position={[0, -0.85, 0.1]}>
          {/* Sole */}
          <RoundedBox position={[0, -0.15, 0]} args={[0.55, 0.1, 0.8]} radius={0.02} material={shoeMaterial} castShadow />
          {/* Main Shoe */}
          <RoundedBox position={[0, 0.05, 0]} args={[0.5, 0.25, 0.7]} radius={0.1} material={shoeMaterial} castShadow />
          {/* Shoe Detail/Accent */}
          <mesh position={[0, 0.1, 0.2]} material={shoeDetailMaterial}>
            <boxGeometry args={[0.4, 0.1, 0.4]} />
          </mesh>
          {/* Tongue */}
          <mesh position={[0, 0.2, -0.1]} rotation={[Math.PI / 4, 0, 0]} material={shoeMaterial}>
            <boxGeometry args={[0.3, 0.3, 0.05]} />
          </mesh>
        </group>
      </group>
    </group>
  );
}
