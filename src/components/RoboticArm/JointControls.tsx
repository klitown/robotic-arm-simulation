import React from "react";
import { degreesToRadians } from "../../utils/math";

interface JointControlsProps {
    jointAngles: number[];
    setJointAngles: (angles: number[]) => void;
}

export const JointControls: React.FC<JointControlsProps> = ({
    jointAngles,
    setJointAngles,
}) => {
    const handleJointChange = (index: number, degrees: number) => {
        // Clamp value between -180 and 180
        const clampedDegrees = Math.min(Math.max(degrees, -180), 180);
        const newAngles = [...jointAngles];
        newAngles[index] = degreesToRadians(clampedDegrees);
        setJointAngles(newAngles);
    };

    return (
        <div
            style={{
                padding: "20px",
                backgroundColor: "#f5f5f5",
                width: "300px",
                position: "absolute",
                right: 0,
                top: 0,
                height: "100vh",
                overflowY: "auto",
                zIndex: 1000,
            }}
        >
            <h3>Joint Controls</h3>
            {["Base", "Shoulder", "Elbow"].map((joint, index) => (
                <div key={joint} style={{ marginBottom: "20px" }}>
                    <div
                        style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            marginBottom: "5px",
                        }}
                    >
                        <label>{joint} Rotation:</label>
                        <input
                            type="number"
                            min="-180"
                            max="180"
                            value={Math.round(
                                jointAngles[index] * (180 / Math.PI)
                            )}
                            onChange={(e) =>
                                handleJointChange(index, Number(e.target.value))
                            }
                            style={{
                                width: "70px",
                                marginLeft: "10px",
                                padding: "5px",
                            }}
                        />
                        <span>°</span>
                    </div>
                    <input
                        type="range"
                        min="-180"
                        max="180"
                        value={Math.round(jointAngles[index] * (180 / Math.PI))}
                        onChange={(e) =>
                            handleJointChange(index, Number(e.target.value))
                        }
                        style={{ width: "100%" }}
                    />
                </div>
            ))}
        </div>
    );
};
