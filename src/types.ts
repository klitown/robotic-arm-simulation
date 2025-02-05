// types.ts
import * as THREE from "three";

export interface Joint {
    mesh: THREE.Mesh;
    pivot: THREE.Object3D;
    minAngle: number;
    maxAngle: number;
    currentAngle: number;
}

export interface RobotArm {
    base: THREE.Object3D;
    joints: Joint[];
    endEffector: THREE.Object3D;
    camera: THREE.PerspectiveCamera;
    gripperOffset: THREE.Vector3;
    maxReach: number;
}

export interface SimulationState {
    selectedObject: THREE.Object3D | null;
    isGripping: boolean;
    isAnimating: boolean;
}
