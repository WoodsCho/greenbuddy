import MainLayout from './layouts/MainLayout';
import DashboardService from './services/dashboard/DashboardService';
import Viewer3DService from './services/viewer3d/Viewer3DService';
import './styles/global.css';
import './styles/dashboard.css';
import './styles/viewer3d.css';

function App() {
    // 올바른 public 경로로 설정
    const modelPath = '/models/Hydroponics.glb';

    return (
        <MainLayout>
            <DashboardService>
                <Viewer3DService
                    modelPath={modelPath}
                    className="hydroponic-viewer"
                />
            </DashboardService>
        </MainLayout>
    );
}

export default App;