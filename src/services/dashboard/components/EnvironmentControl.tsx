import { useState, useEffect } from 'react';

const EnvironmentControl: React.FC = () => {
    const [activeTab, setActiveTab] = useState<'asset' | 'nutrient' | 'monitor' | 'auto'>('asset');

    // 환경 데이터 (실제 스크린샷 수치 반영)
    const [environmentData, setEnvironmentData] = useState({
        temperature: 24.5,
        humidity: 60,
        co2: 420,
        light: 85,
        ph: 6.2,
        ec: 1.8,
        waterTemp: 22.0,
        oxygenLevel: 8.5
    });

    // 실시간 데이터 업데이트
    useEffect(() => {
        const interval = setInterval(() => {
            setEnvironmentData(() => ({
                temperature: 24.5 + (Math.random() - 0.5) * 0.4,
                humidity: 60 + (Math.random() - 0.5) * 8,
                co2: 420 + (Math.random() - 0.5) * 20,
                light: 85 + (Math.random() - 0.5) * 6,
                ph: 6.2 + (Math.random() - 0.5) * 0.2,
                ec: 1.8 + (Math.random() - 0.5) * 0.2,
                waterTemp: 22.0 + (Math.random() - 0.5) * 1,
                oxygenLevel: 8.5 + (Math.random() - 0.5) * 0.6
            }));
        }, 3000);

        return () => clearInterval(interval);
    }, []);

    // ... 나머지 render 함수들은 동일 ...
    const renderAssetEnvironment = () => (
        <div className="environment-section">
            <h4>🏠 자산부 환경관리</h4>
            <div className="environment-grid">
                <div className="env-item">
                    <span className="env-label">온도</span>
                    <span className="env-value">{environmentData.temperature.toFixed(1)}°C</span>
                    <div className="env-range">
                        <input
                            type="range"
                            min="18"
                            max="30"
                            step="0.1"
                            value={environmentData.temperature}
                            onChange={(e) => setEnvironmentData({...environmentData, temperature: parseFloat(e.target.value)})}
                        />
                    </div>
                    <div className="env-target">목표: 24.0°C</div>
                </div>

                <div className="env-item">
                    <span className="env-label">습도</span>
                    <span className="env-value">{environmentData.humidity.toFixed(0)}%</span>
                    <div className="env-range">
                        <input
                            type="range"
                            min="40"
                            max="80"
                            value={environmentData.humidity}
                            onChange={(e) => setEnvironmentData({...environmentData, humidity: parseInt(e.target.value)})}
                        />
                    </div>
                    <div className="env-target">목표: 60%</div>
                </div>

                <div className="env-item">
                    <span className="env-label">CO2</span>
                    <span className="env-value">{environmentData.co2.toFixed(0)}ppm</span>
                    <div className="env-range">
                        <input
                            type="range"
                            min="300"
                            max="800"
                            value={environmentData.co2}
                            onChange={(e) => setEnvironmentData({...environmentData, co2: parseInt(e.target.value)})}
                        />
                    </div>
                    <div className="env-target">목표: 420ppm</div>
                </div>

                <div className="env-item">
                    <span className="env-label">조도</span>
                    <span className="env-value">{environmentData.light.toFixed(0)}%</span>
                    <div className="env-range">
                        <input
                            type="range"
                            min="0"
                            max="100"
                            value={environmentData.light}
                            onChange={(e) => setEnvironmentData({...environmentData, light: parseInt(e.target.value)})}
                        />
                    </div>
                    <div className="env-target">목표: 85%</div>
                </div>
            </div>

            <div className="control-buttons">
                <button className="env-btn primary">🤖 자동 제어 ON</button>
                <button className="env-btn secondary">💾 설정 저장</button>
            </div>
        </div>
    );

    const renderNutrientManagement = () => (
        <div className="environment-section">
            <h4>🧪 근접부 환경관리</h4>
            <div className="environment-grid">
                <div className="env-item">
                    <span className="env-label">pH</span>
                    <span className="env-value">{environmentData.ph.toFixed(1)}</span>
                    <div className="env-status good">적정</div>
                </div>

                <div className="env-item">
                    <span className="env-label">EC</span>
                    <span className="env-value">{environmentData.ec.toFixed(1)}mS/cm</span>
                    <div className="env-status good">양호</div>
                </div>

                <div className="env-item">
                    <span className="env-label">수온</span>
                    <span className="env-value">{environmentData.waterTemp.toFixed(1)}°C</span>
                    <div className="env-status good">정상</div>
                </div>

                <div className="env-item">
                    <span className="env-label">용존산소</span>
                    <span className="env-value">{environmentData.oxygenLevel.toFixed(1)}mg/L</span>
                    <div className="env-status good">충분</div>
                </div>
            </div>

            <div className="nutrient-control">
                <h5>🔧 양액 공급 제어</h5>
                <div className="nutrient-buttons">
                    <button className="env-btn">A액 공급</button>
                    <button className="env-btn">B액 공급</button>
                    <button className="env-btn">pH↑</button>
                    <button className="env-btn">pH↓</button>
                </div>
            </div>
        </div>
    );

    const renderMonitoring = () => (
        <div className="environment-section">
            <h4>📊 환경정보 모니터링</h4>
            <div className="monitoring-grid">
                <div className="monitor-card">
                    <h6>🌡️ 온도 센서</h6>
                    <div className="sensor-data">
                        <span>내부온도: {environmentData.temperature.toFixed(1)}°C</span>
                        <span>외부온도: 18.2°C</span>
                        <span>수온: {environmentData.waterTemp.toFixed(1)}°C</span>
                    </div>
                </div>

                <div className="monitor-card">
                    <h6>💧 수분 센서</h6>
                    <div className="sensor-data">
                        <span>습도: {environmentData.humidity.toFixed(0)}%</span>
                        <span>토양수분: 적정</span>
                        <span>급수량: 125L/일</span>
                    </div>
                </div>

                <div className="monitor-card">
                    <h6>🌱 생육 센서</h6>
                    <div className="sensor-data">
                        <span>엽면적: 92%</span>
                        <span>생체중: 145g</span>
                        <span>생육일수: 28일</span>
                    </div>
                </div>

                <div className="monitor-card">
                    <h6>⚡ 에너지 센서</h6>
                    <div className="sensor-data">
                        <span>소비전력: 2.8kW</span>
                        <span>LED 효율: 88%</span>
                        <span>일일 전력: 65kWh</span>
                    </div>
                </div>
            </div>

            <div className="alert-section">
                <h6>🔔 실시간 알림</h6>
                <div className="alerts">
                    <div className="alert-item success">✅ 모든 시스템 정상 작동</div>
                    <div className="alert-item success">✅ 환경 수치 최적 범위</div>
                    <div className="alert-item">ℹ️ 다음 수확 예정: 7일 후</div>
                </div>
            </div>
        </div>
    );

    const renderAutoControl = () => (
        <div className="environment-section">
            <h4>⚙️ 스마트 자동 운영</h4>
            <div className="auto-control-grid">
                <div className="auto-item">
                    <div className="auto-header">
                        <span>🌡️ 온실 환경 자동제어</span>
                        <div className="toggle-switch active">ON</div>
                    </div>
                    <div className="auto-details">
                        <span>• 온도 24.5°C ± 0.5 자동 유지</span>
                        <span>• 습도, CO2 실시간 조절</span>
                    </div>
                </div>

                <div className="auto-item">
                    <div className="auto-header">
                        <span>💧 양액 스마트 공급</span>
                        <div className="toggle-switch active">ON</div>
                    </div>
                    <div className="auto-details">
                        <span>• pH 6.2 ± 0.1 자동 조절</span>
                        <span>• EC 1.8 ± 0.2 자동 관리</span>
                    </div>
                </div>

                <div className="auto-item">
                    <div className="auto-header">
                        <span>💡 LED 스마트 조명</span>
                        <div className="toggle-switch active">ON</div>
                    </div>
                    <div className="auto-details">
                        <span>• 일조량 연동 자동 점등</span>
                        <span>• 생육단계별 스펙트럼 조절</span>
                    </div>
                </div>

                <div className="auto-item">
                    <div className="auto-header">
                        <span>🌬️ 환기 자동 시스템</span>
                        <div className="toggle-switch active">ON</div>
                    </div>
                    <div className="auto-details">
                        <span>• 온도 기반 자동 환기</span>
                        <span>• 공기 순환 최적화</span>
                    </div>
                </div>
            </div>

            <div className="schedule-section">
                <h6>📅 오늘의 운영 스케줄</h6>
                <div className="schedule-list">
                    <div className="schedule-item completed">✅ 06:00 - LED 조명 점등 완료</div>
                    <div className="schedule-item completed">✅ 09:00 - 1차 양액 공급 완료</div>
                    <div className="schedule-item current">🔄 15:00 - 2차 양액 공급 진행중</div>
                    <div className="schedule-item">⏰ 18:00 - LED 조명 소등 예정</div>
                    <div className="schedule-item">⏰ 21:00 - 야간 환기 모드 전환</div>
                </div>
            </div>
        </div>
    );

    return (
        <div className="environment-control">
            <div className="control-tabs">
                <button
                    className={`tab-btn ${activeTab === 'asset' ? 'active' : ''}`}
                    onClick={() => setActiveTab('asset')}
                >
                    🏠 자산부
                </button>
                <button
                    className={`tab-btn ${activeTab === 'nutrient' ? 'active' : ''}`}
                    onClick={() => setActiveTab('nutrient')}
                >
                    🧪 근접부
                </button>
                <button
                    className={`tab-btn ${activeTab === 'monitor' ? 'active' : ''}`}
                    onClick={() => setActiveTab('monitor')}
                >
                    📊 모니터링
                </button>
                <button
                    className={`tab-btn ${activeTab === 'auto' ? 'active' : ''}`}
                    onClick={() => setActiveTab('auto')}
                >
                    ⚙️ 자동운영
                </button>
            </div>

            <div className="control-content">
                {activeTab === 'asset' && renderAssetEnvironment()}
                {activeTab === 'nutrient' && renderNutrientManagement()}
                {activeTab === 'monitor' && renderMonitoring()}
                {activeTab === 'auto' && renderAutoControl()}
            </div>
        </div>
    );
};

export default EnvironmentControl;