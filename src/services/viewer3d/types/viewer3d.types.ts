import { Object3D } from 'three';

export interface ModelLoaderProps {
    modelPath: string;
    onLoad?: (model: Object3D) => void;
    onProgress?: (progress: ProgressEvent) => void;
    onError?: (error: Error) => void;
}

export interface SceneProps {
    children?: React.ReactNode;
    cameraPosition?: [number, number, number];
    enableControls?: boolean;
    backgroundColor?: string;
}

export interface ControlsProps {
    enableZoom?: boolean;
    enablePan?: boolean;
    enableRotate?: boolean;
    autoRotate?: boolean;
    autoRotateSpeed?: number;
}

export interface ModelData {
    isLoaded: boolean;
    model: Object3D | null;
    error: string | null;
}