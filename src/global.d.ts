import { ThreeElements } from '@react-three/fiber'

declare global {
  namespace React {
    namespace JSX {
      interface IntrinsicElements extends ThreeElements {
      }
    }
  }
}

export {};  // This makes the file a module
