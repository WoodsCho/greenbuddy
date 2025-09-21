import { useState, useEffect } from 'react';

interface QualityControlProps {
    goodProduct?: number;
    rejectedProduct?: number;
}

const QualityControl: React.FC<QualityControlProps> = () => {
    const [cropData, setCropData] = useState({
        totalSeedlings: 240,
        healthySeedlings: 228,
        weakSeedlings: 12,
        growthStage: 75,
        avgHeight: 18.5,
        harvestDays: 7,
    });

    useEffect(() => {
        const interval = setInterval(() => {
            setCropData(prev => ({
                ...prev,
                avgHeight: 18.5 + (Math.random() - 0.5) * 0.4,
                growthStage: Math.min(100, prev.growthStage + (Math.random() * 0.1)),
                harvestDays: Math.max(0, prev.harvestDays - (Math.random() * 0.001)),
            }));
        }, 5000);

        return () => clearInterval(interval);
    }, []);

    const getGrowthStageText = (stage: number) => {
        if (stage >= 90) return "수확 준비";
        if (stage >= 70) return "성숙기";
        if (stage >= 50) return "성장기";
        if (stage >= 30) return "발육기";
        return "초기 생장";
    };

    const getGrowthColor = (stage: number) => {
        if (stage >= 90) return "#FF6B35";
        if (stage >= 70) return "#4CAF50";
        if (stage >= 50) return "#8BC34A";
        if (stage >= 30) return "#CDDC39";
        return "#FFC107";
    };

    return (
        <div className="quality-control">
            <div className="crop-info">
                <h3>🌱 작물 현황</h3>

                <div className="crop-status-grid">
                    <div className="status-item seedlings">
                        <div className="status-header">
                            <span className="status-icon">🌿</span>
                            <span className="status-label">총 모종</span>
                        </div>
                        <div className="status-value">{cropData.totalSeedlings}주</div>
                        <div className="status-detail">
                            건강 {cropData.healthySeedlings}주<br/>약함 {cropData.weakSeedlings}주
                        </div>
                    </div>

                    <div className="status-item growth">
                        <div className="status-header">
                            <span className="status-icon">📊</span>
                            <span className="status-label">생육 상태</span>
                        </div>
                        <div className="status-value" style={{ color: getGrowthColor(cropData.growthStage) }}>
                            {cropData.growthStage.toFixed(1)}%
                        </div>
                        <div className="status-detail">{getGrowthStageText(cropData.growthStage)}</div>
                        <div className="growth-bar">
                            <div
                                className="growth-progress"
                                style={{
                                    width: `${cropData.growthStage}%`,
                                    backgroundColor: getGrowthColor(cropData.growthStage)
                                }}
                            ></div>
                        </div>
                    </div>

                    <div className="status-item height">
                        <div className="status-header">
                            <span className="status-icon">📏</span>
                            <span className="status-label">평균 키</span>
                        </div>
                        <div className="status-value">{cropData.avgHeight.toFixed(1)}cm</div>
                        <div className="status-detail">목표: 25cm</div>
                    </div>

                    <div className="status-item harvest">
                        <div className="status-header">
                            <span className="status-icon">🗓️</span>
                            <span className="status-label">수확 예정</span>
                        </div>
                        <div className="status-value harvest-days">
                            {Math.ceil(cropData.harvestDays)}일 후
                        </div>
                        <div className="status-detail">예상량: 180kg</div>
                    </div>
                </div>

                <div className="crop-summary">
                    <div className="summary-item">
                        <span className="summary-label">생존율</span>
                        <span className="summary-value success">
              {((cropData.healthySeedlings / cropData.totalSeedlings) * 100).toFixed(1)}%
            </span>
                    </div>
                    <div className="summary-item">
                        <span className="summary-label">품종</span>
                        <span className="summary-value">청축면 상추</span>
                    </div>
                    <div className="summary-item">
                        <span className="summary-label">파종일</span>
                        <span className="summary-value">12.28</span>
                    </div>
                    <div className="summary-item">
                        <span className="summary-label">재배일</span>
                        <span className="summary-value">28일차</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default QualityControl;