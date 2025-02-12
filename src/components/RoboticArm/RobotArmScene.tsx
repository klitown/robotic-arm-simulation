import React, { useRef, useState } from "react";
import * as THREE from "three";
import { Text, Center } from "@react-three/drei";
import { ThreeEvent, useThree } from "@react-three/fiber";

interface Cube {
    position: [number, number, number];
    color: string;
}

interface RobotArmSceneProps {
    jointAngles: number[];
    onDropCube: (fn: () => void) => void;
    onPickUpCube: (picked: boolean) => void;
    cubes: Cube[];
}

export const RobotArmScene: React.FC<RobotArmSceneProps> = ({
    jointAngles,
    onDropCube,
    onPickUpCube,
    cubes,
}) => {
    const { scene } = useThree();
    const baseRef = useRef<THREE.Group>(null);
    const shoulderRef = useRef<THREE.Group>(null);
    const elbowRef = useRef<THREE.Group>(null);
    const [selectedCube, setSelectedCube] = useState<THREE.Mesh | null>(null);
    const [isGrasping, setIsGrasping] = useState(false);
    const [selectedCubeIndex, setSelectedCubeIndex] = useState<number | null>(
        null
    );

    const handleCubeClick = (event: ThreeEvent<MouseEvent>, index: number) => {
        event.stopPropagation();
        if (!isGrasping) {
            setSelectedCubeIndex(index);
            setSelectedCube(event.object as THREE.Mesh);
        }
    };

    React.useEffect(() => {
        if (baseRef.current && shoulderRef.current && elbowRef.current) {
            baseRef.current.rotation.y = jointAngles[0];
            shoulderRef.current.rotation.z = jointAngles[1];
            elbowRef.current.rotation.z = jointAngles[2];

            // If we have a selected cube and the arm is in position, grasp it
            if (selectedCube && !isGrasping) {
                const endEffectorPosition = new THREE.Vector3();
                const endEffector = elbowRef.current.children[1]; // The green sphere
                endEffector.getWorldPosition(endEffectorPosition);

                const cubePosition = selectedCube.position;
                if (endEffectorPosition.distanceTo(cubePosition) < 0.5) {
                    setIsGrasping(true);
                    // Attach to the end effector (green sphere)
                    selectedCube.position.set(0, 0, 0); // Reset local position
                    endEffector.add(selectedCube); // Add the cube to the end effector
                    onPickUpCube(true);
                }
            }
        }
    }, [jointAngles, selectedCube, isGrasping]);

    React.useEffect(() => {
        onDropCube(() => {
            if (selectedCube && isGrasping && elbowRef.current) {
                // Store the cube's current world position
                const worldPosition = new THREE.Vector3();
                selectedCube.getWorldPosition(worldPosition);

                // Remove from end effector
                const endEffector = elbowRef.current.children[1];
                endEffector.remove(selectedCube);

                // Add back to scene at the stored world position
                scene.add(selectedCube);
                selectedCube.position.copy(worldPosition);

                // Reset states
                setIsGrasping(false);
                setSelectedCube(null);
                setSelectedCubeIndex(null);
            }
        });
    }, [selectedCube, isGrasping, onDropCube, scene]);

    return (
        <group>
            <Center position={[0, 0.1, -2]}>
                <Text
                    fontSize={0.5}
                    color="#4a4a4a"
                    anchorX="left"
                    anchorY="middle"
                >
                    Ekumen
                </Text>
            </Center>

            {/* Render cubes from the cubes prop */}
            {cubes.map((cube, index) => (
                <mesh
                    key={index}
                    position={cube.position}
                    onClick={(e) => handleCubeClick(e, index)}
                >
                    <boxGeometry args={[0.3, 0.3, 0.3]} />
                    <meshStandardMaterial
                        color={cube.color}
                        emissive={
                            selectedCubeIndex === index ? 0x444444 : 0x000000
                        }
                    />
                </mesh>
            ))}

            {/* Robot Arm */}
            <group ref={baseRef}>
                <mesh position={[0, 0.25, 0]}>
                    <boxGeometry args={[0.5, 0.5, 0.5]} />
                    <meshStandardMaterial color="black" />
                </mesh>

                {/* The grouped elements are the parts of the arm */}
                <group ref={shoulderRef} position={[0, 0.5, 0]}>
                    <mesh position={[0, 0.5, 0]}>
                        <boxGeometry args={[0.3, 1, 0.3]} />
                        <meshStandardMaterial color="blue" />
                    </mesh>

                    <group ref={elbowRef} position={[0, 1, 0]}>
                        <mesh position={[0, 0.5, 0]}>
                            <boxGeometry args={[0.2, 1, 0.2]} />
                            <meshStandardMaterial color="red" />
                        </mesh>

                        <mesh position={[0, 1, 0]}>
                            <sphereGeometry args={[0.1]} />
                            <meshStandardMaterial color="green" />
                        </mesh>
                    </group>
                </group>
            </group>
        </group>
    );
};
