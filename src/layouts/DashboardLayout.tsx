import EquipmentStatus from '../services/dashboard/components/EquipmentStatus';
import ProductionMetrics from '../services/dashboard/components/ProductionMetrics';
import QualityControl from '../services/dashboard/components/QualityControl';
import EnvironmentControl from '../services/dashboard/components/EnvironmentControl';
import { DashboardData } from '../shared/types/ctypes.ts';
import '../styles/dashboard.css';

interface DashboardLayoutProps {
    data: DashboardData;
    children?: React.ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ data, children }) => {
    // 기본값을 먼저 설정하고 data로 덮어쓰기
    const defaultData: DashboardData = {
        equipment: [],
        production: {
            goodProduct: 0,
            rejectedProduct: 0,
            targetRate: 100,
            currentRate: 0,
        },
        processNodes: [],
        timestamp: new Date(),
    };

    // data가 있으면 기본값과 병합
    const safeData: DashboardData = {
        ...defaultData,
        ...data,
        production: {
            ...defaultData.production,
            ...data?.production,
        },
    };

    return (
        <div className="dashboard-layout fullscreen">
            {/* 전체 화면 3D 뷰어 배경 */}
            <div className="fullscreen-viewer">
                {children || <div className="placeholder-3d">3D 수경재배 시설 뷰어</div>}
            </div>

            {/* 좌측 환경 제어 패널 */}
            <aside className="left-overlay-panel environment">
                <EnvironmentControl />
            </aside>

            {/* 좌측 작물 현황 패널 (환경 제어 패널 옆) */}
            <aside className="left-overlay-panel crop">
                <QualityControl
                    goodProduct={safeData.production.goodProduct}
                    rejectedProduct={safeData.production.rejectedProduct}
                />
            </aside>

            {/* 우측 오버레이 패널 - 시설 상태 */}
            <aside className="right-overlay-panel">
                <EquipmentStatus equipment={safeData.equipment} />
                <ProductionMetrics production={safeData.production} />
            </aside>

            {/* 하단 컨트롤 오버레이 */}
            <div className="bottom-controls-overlay">
                <button className="control-btn active"> 환경관리</button>
                <button className="control-btn"> 모니터링</button>
                <button className="control-btn">⚙️ 자동운영</button>
            </div>
        </div>
    );
};

export default DashboardLayout;