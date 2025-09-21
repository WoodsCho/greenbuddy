import React from 'react';
import PureThreeViewer from './components/PureThreeViewer';

interface Viewer3DServiceProps {
    modelPath: string;
    className?: string;
}

const Viewer3DService: React.FC<Viewer3DServiceProps> = ({ modelPath, className }) => {
    return (
        <div className={`viewer3d-service ${className || ''}`}>
            <PureThreeViewer
                modelPath={modelPath}
                className="viewer3d-canvas"
            />

            <div className="viewer3d-info">
                <h4>🌿 수경재배 시설 3D</h4>
                <p>• 실시간 3D 모델링</p>
                <p>• 인터랙티브 조작</p>
                <p>• 스마트 조명 시스템</p>
            </div>
        </div>
    );
};

export default Viewer3DService;