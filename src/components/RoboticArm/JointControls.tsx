import React from "react";

interface JointControlsProps {
    jointAngles: number[];
    setJointAngles: (angles: number[]) => void;
    onDropCube: () => void;
    onSpawnCube: () => void;
    isGrasping: boolean;
}

export const JointControls: React.FC<JointControlsProps> = ({
    jointAngles,
    setJointAngles,
    onDropCube,
    onSpawnCube,
    isGrasping,
}) => {
    return (
        <div
            style={{
                position: "absolute",
                left: "20px",
                top: "20px",
                padding: "20px",
                backgroundColor: "rgba(255, 255, 255, 0.9)",
                borderRadius: "10px",
                border: "1px solid black",
                zIndex: 1000,
            }}
        >
            <div>
                <h3 style={{ marginTop: 0 }}>Joint Controls</h3>
                {["Base", "Shoulder", "Elbow"].map((joint, index) => (
                    <div key={joint} style={{ marginBottom: "10px" }}>
                        <div
                            style={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "space-between",
                                marginBottom: "5px",
                            }}
                        >
                            <label>{joint}:</label>
                            <div
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                }}
                            >
                                <input
                                    type="number"
                                    value={Number(
                                        (
                                            jointAngles[index] *
                                            (180 / Math.PI)
                                        ).toFixed(1)
                                    )}
                                    onChange={(e) => {
                                        const newAngles = [...jointAngles];
                                        // Convert degrees to radians
                                        newAngles[index] =
                                            Number(e.target.value) *
                                            (Math.PI / 180);
                                        setJointAngles(newAngles);
                                    }}
                                    style={{
                                        width: "70px",
                                        marginLeft: "10px",
                                        padding: "2px 5px",
                                    }}
                                    min="-180"
                                    max="180"
                                    step="0.1"
                                />
                                <span style={{ marginLeft: "5px" }}>°</span>
                            </div>
                        </div>
                        <input
                            type="range"
                            min={-Math.PI}
                            max={Math.PI}
                            step={0.01}
                            value={jointAngles[index]}
                            onChange={(e) => {
                                const newAngles = [...jointAngles];
                                newAngles[index] = parseFloat(e.target.value);
                                setJointAngles(newAngles);
                            }}
                            style={{ width: "200px" }}
                        />
                    </div>
                ))}
            </div>

            <div style={{ marginTop: "20px" }}>
                <p style={{ fontSize: "1.2rem", margin: "10px 0" }}>
                    {isGrasping
                        ? "Try to drop the cube!"
                        : "Try to pick up the cube!"}
                </p>
                <div style={{ display: "flex", gap: "10px" }}>
                    <button
                        onClick={onDropCube}
                        style={{
                            padding: "10px 20px",
                            fontSize: "16px",
                            backgroundColor: "#4CAF50",
                            color: "white",
                            border: "none",
                            borderRadius: "5px",
                            cursor: "pointer",
                        }}
                    >
                        Drop Cube
                    </button>
                    <button
                        onClick={onSpawnCube}
                        style={{
                            padding: "10px 20px",
                            fontSize: "16px",
                            backgroundColor: "#2196F3",
                            color: "white",
                            border: "none",
                            borderRadius: "5px",
                            cursor: "pointer",
                        }}
                    >
                        Spawn Cube
                    </button>
                </div>
            </div>
        </div>
    );
};
