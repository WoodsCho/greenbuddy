/// <reference types="vite/client" />

// JSON 모듈 타입 선언
declare module "*.json" {
    const content: any;
    export default content;
}

// GLTF 파일 타입 선언
declare module "*.glb" {
    const src: string;
    export default src;
}

declare module "*.gltf" {
    const src: string;
    export default src;
}

// Three.js 추가 모듈 타입 선언
declare module 'three/examples/jsm/loaders/GLTFLoader' {
    import { Loader, Group } from 'three';

    export interface GLTF {
        scene: Group;
        scenes: Group[];
        cameras: any[];
        animations: any[];
        asset: any;
    }

    export class GLTFLoader extends Loader {
        load(
            url: string,
            onLoad: (gltf: GLTF) => void,
            onProgress?: (event: ProgressEvent) => void,
            onError?: (event: ErrorEvent) => void
        ): void;
    }
}

declare module 'three/examples/jsm/controls/OrbitControls' {
    import { Camera, EventDispatcher } from 'three';

    export class OrbitControls extends EventDispatcher {
        constructor(camera: Camera, domElement?: HTMLElement);

        enabled: boolean;
        enableDamping: boolean;
        dampingFactor: number;
        screenSpacePanning: boolean;
        minDistance: number;
        maxDistance: number;
        maxPolarAngle: number;
        autoRotate: boolean;
        autoRotateSpeed: number;
        enablePan: boolean;
        enableZoom: boolean;
        enableRotate: boolean;

        update(): void;
        dispose(): void;
    }
}