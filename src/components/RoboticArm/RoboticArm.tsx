import React, { useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { RobotArmScene } from "./RobotArmScene";
import { JointControls } from "./JointControls";

const RoboticArm: React.FC = () => {
    const [jointAngles, setJointAngles] = useState([0, 0, 0]); // Base, Shoulder, Elbow

    return (
        <div style={{ width: '100vw', height: '100vh', position: 'relative' }}>
            <Canvas camera={{ position: [2, 2, 2], fov: 50 }}>
                <RobotArmScene jointAngles={jointAngles} />
                <OrbitControls makeDefault />
                <gridHelper args={[10, 10]} />
                <ambientLight intensity={0.5} />
                <directionalLight position={[5, 5, 5]} intensity={0.8} />
            </Canvas>
            <JointControls 
                jointAngles={jointAngles} 
                setJointAngles={setJointAngles}
            />
        </div>
    );
};

export default RoboticArm;
