import React, { useRef } from 'react';
import * as THREE from 'three';
import { Text, Center } from '@react-three/drei';

interface RobotArmSceneProps {
    jointAngles: number[];
}

export const RobotArmScene: React.FC<RobotArmSceneProps> = ({ jointAngles }) => {
    const baseRef = useRef<THREE.Group>(null);
    const shoulderRef = useRef<THREE.Group>(null);
    const elbowRef = useRef<THREE.Group>(null);



    React.useEffect(() => {
        if (baseRef.current && shoulderRef.current && elbowRef.current) {
            baseRef.current.rotation.y = jointAngles[0];
            shoulderRef.current.rotation.z = jointAngles[1];
            elbowRef.current.rotation.z = jointAngles[2];
        }
    }, [jointAngles]);

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

            <group ref={baseRef}>
                <mesh position={[0, 0.25, 0]}>
                    <boxGeometry args={[0.5, 0.5, 0.5]} />
                    <meshStandardMaterial color="black" />
                </mesh>
                
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