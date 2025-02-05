# Robotic Arm Simulation

A 3D interactive robotic arm simulation built with React and Three.js. The simulation features a 3-joint robotic arm that can pick up and manipulate colored cubes in a 3D environment.


## Features

- **3D Robotic Arm**
  - Base joint (black) - rotates horizontally
  - Shoulder joint (blue) - controls arm elevation
  - Elbow joint (red) - provides fine control
  - End effector (green) - grips objects

- **Interactive Controls**
  - Slider controls for precise joint manipulation
  - Real-time joint angle display
  - Pick and drop functionality

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm / yarn / bun

### Installation
```bash
# Clone the repository
git clone https://github.com/klitown/robotic-arm-simulation

# Navigate to project directory
cd robotic-arm-simulation

# Install dependencies
npm install (or yarn or bun)

# Start development server
npm run dev (or yarn dev or bun dev)
```

## Usage

1. **Moving the Arm**
   - Use the sliders on the right to control each joint
   - Base slider: -180° to 180° horizontal rotation
   - Shoulder and elbow sliders: vertical movement

2. **Interacting with Objects**
   - Click on a colored cube to select it
   - Move the arm close to the cube to pick it up
   - Use the "Drop Cube" button to release the cube

3. **Camera Controls**
   - Left click + drag: Rotate view
   - Right click + drag: Pan
   - Scroll: Zoom

## Tech Stack

- React 19
- TypeScript
- Three.js
- React Three Fiber
- @react-three/drei
- Vite