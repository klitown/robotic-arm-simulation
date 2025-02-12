import React, { useState, useCallback } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { RobotArmScene } from "./RobotArmScene";
import { JointControls } from "./JointControls";

const RoboticArm: React.FC = () => {
    const [jointAngles, setJointAngles] = useState([0, 0, 0]); // Base, Shoulder, Elbow
    const dropCubeRef = React.useRef(() => {});
    const [isGrasping, setIsGrasping] = useState(false);

    // Initial cubes
    const initialCubes = [
        {
            position: [-1, 0.25, -1] as [number, number, number],
            color: "orange",
        },
        { position: [1, 0.25, 1] as [number, number, number], color: "purple" },
        { position: [-1, 0.25, 1] as [number, number, number], color: "cyan" },
    ];
    const [cubes, setCubes] = useState(initialCubes);

    const handleDropCube = useCallback(() => {
        dropCubeRef.current();
        setIsGrasping(false);
    }, []);

    // Handler for spawning a cube at a random position with a random color
    const handleSpawnCube = () => {
        const randomX = Math.random() * 10 - 5; // range -5 to 5
        const randomZ = Math.random() * 10 - 5; // range -5 to 5
        const colors = [
            "orange",
            "purple",
            "cyan",
            "green",
            "yellow",
            "magenta",
        ];
        const randomColor = colors[Math.floor(Math.random() * colors.length)];
        const newCube = {
            position: [randomX, 0.25, randomZ] as [number, number, number],
            color: randomColor,
        };
        setCubes((prev) => [...prev, newCube]);
    };

    return (
        <div style={{ width: "100vw", height: "100vh", position: "relative" }}>
            <Canvas camera={{ position: [10, 10, 10], fov: 30 }}>
                <RobotArmScene
                    jointAngles={jointAngles}
                    onDropCube={(fn) => {
                        dropCubeRef.current = fn;
                    }}
                    onPickUpCube={(picked) => {
                        setIsGrasping(picked);
                    }}
                    cubes={cubes} // Pass cubes state to the scene
                />
                <OrbitControls makeDefault />
                <gridHelper args={[10, 10]} />
                <ambientLight intensity={0.7} />
                <directionalLight position={[5, 5, 5]} intensity={0.8} />
            </Canvas>
            <JointControls
                jointAngles={jointAngles}
                setJointAngles={setJointAngles}
                onDropCube={handleDropCube}
                onSpawnCube={handleSpawnCube}
                isGrasping={isGrasping}
            />
        </div>
    );
};

export default RoboticArm;
