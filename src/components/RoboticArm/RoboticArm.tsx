import React, { useState, useCallback } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { RobotArmScene } from "./RobotArmScene";
import { JointControls } from "./JointControls";

const RoboticArm: React.FC = () => {
    const [jointAngles, setJointAngles] = useState([0, 0, 0]); // Base, Shoulder, Elbow
    const dropCubeRef = React.useRef(() => {});
    const [isGrasping, setIsGrasping] = useState(false);

    const handleDropCube = useCallback(() => {
        dropCubeRef.current();
        setIsGrasping(false);
    }, []);


    return (
        <div style={{ width: '100vw', height: '100vh', position: 'relative' }}>
            <Canvas camera={{ position: [10, 10, 10], fov: 30 }}>
                <RobotArmScene 
                    jointAngles={jointAngles} 
                    onDropCube={(fn) => { dropCubeRef.current = fn }}
                    onPickUpCube={(picked) => { setIsGrasping(picked) }}
                />
                <OrbitControls makeDefault />
                <gridHelper args={[10, 10]} />
                <ambientLight intensity={0.5} />
                <directionalLight position={[5, 5, 5]} intensity={0.8} />
            </Canvas>
            <div style={{
                position: 'absolute',
                left: '500px',
                top: '20px',
                zIndex: 1000,
                fontSize: "3rem"
            }}>
                <p>{isGrasping ? "Try to drop the cube!" : "Try to pick up the cube!"}</p>
            </div>
            <div style={{
                position: 'absolute',
                left: '20px',
                top: '20px',
                zIndex: 1000
            }}>
                <button
                    onClick={handleDropCube}
                    style={{
                        padding: '10px 20px',
                        fontSize: '16px',
                        backgroundColor: '#4CAF50',
                        color: 'white',
                        border: 'none',
                        borderRadius: '5px',
                        cursor: 'pointer'
                    }}
                >
                    Drop Cube
                </button>
            </div>
            <JointControls 
                jointAngles={jointAngles} 
                setJointAngles={setJointAngles}
            />
        </div>
    );
};

export default RoboticArm;
