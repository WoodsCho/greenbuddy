import { EquipmentStatusProps } from '../types/dashboard.types';

const EquipmentStatus: React.FC<EquipmentStatusProps> = ({ equipment = [] }) => {
    const getStatusColor = (status: string) => {
        switch (status) {
            case 'RUNNING': return '#4CAF50';
            case 'BLOCKED': return '#2196F3';
            case 'STARVED': return '#FF9800';
            case 'DOWN': return '#F44336';
            default: return '#9E9E9E';
        }
    };

    const getStatusCount = (status: string) => {
        return equipment.filter(eq => eq.status === status).length;
    };

    if (equipment.length === 0) {
        return (
            <div className="equipment-status">
                <h3>시설 상태</h3>
                <div className="loading-state">데이터를 불러오는 중...</div>
            </div>
        );
    }

    return (
        <div className="equipment-status">
            <h3>시설 상태</h3>
            <div className="status-indicator">정상 운영</div>

            <div className="status-chart">
                <div className="chart-bars">
                    <div
                        className="status-bar running"
                        style={{ height: `${Math.max(getStatusCount('RUNNING') * 20, 5)}px`, backgroundColor: getStatusColor('RUNNING') }}
                    />
                    <div
                        className="status-bar blocked"
                        style={{ height: `${Math.max(getStatusCount('BLOCKED') * 20, 5)}px`, backgroundColor: getStatusColor('BLOCKED') }}
                    />
                    <div
                        className="status-bar starved"
                        style={{ height: `${Math.max(getStatusCount('STARVED') * 20, 5)}px`, backgroundColor: getStatusColor('STARVED') }}
                    />
                    <div
                        className="status-bar down"
                        style={{ height: `${Math.max(getStatusCount('DOWN') * 20, 5)}px`, backgroundColor: getStatusColor('DOWN') }}
                    />
                </div>

                <div className="time-labels">
                    <span>9:00a</span>
                    <span>9:10a</span>
                    <span>9:20a</span>
                    <span>9:30a</span>
                    <span>9:40a</span>
                    <span>9:50a</span>
                </div>
            </div>

            <div className="status-legend">
                <div className="legend-item">
                    <span className="legend-color" style={{ backgroundColor: getStatusColor('DOWN') }}></span>
                    <span>정지</span>
                </div>
                <div className="legend-item">
                    <span className="legend-color" style={{ backgroundColor: getStatusColor('BLOCKED') }}></span>
                    <span>차단</span>
                </div>
                <div className="legend-item">
                    <span className="legend-color" style={{ backgroundColor: getStatusColor('STARVED') }}></span>
                    <span>대기</span>
                </div>
            </div>
        </div>
    );
};

export default EquipmentStatus;