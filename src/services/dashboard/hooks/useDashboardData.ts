import { useState, useEffect } from 'react';
import { DashboardData, Equipment, ProductionData } from '../../../shared/types/ctypes';

// 목업 데이터 생성 함수
const generateMockData = (): DashboardData => {
    const equipment: Equipment[] = [
        { id: '1', name: '급수 시스템', status: 'RUNNING', efficiency: 95 },
        { id: '2', name: '영양액 공급', status: 'RUNNING', efficiency: 92 },
        { id: '3', name: 'LED 조명', status: 'RUNNING', efficiency: 88 },
        { id: '4', name: '환기 시스템', status: 'RUNNING', efficiency: 91 },
        { id: '5', name: '온도 제어', status: 'RUNNING', efficiency: 89 },
        { id: '6', name: 'pH 조절기', status: 'RUNNING', efficiency: 87 },
    ];

    const production: ProductionData = {
        goodProduct: 91.1,
        rejectedProduct: 0.0,
        targetRate: 100,
        currentRate: Math.floor(Math.random() * 10) + 85,
    };

    return {
        equipment,
        production,
        processNodes: [],
        timestamp: new Date(),
    };
};

export const useDashboardData = () => {
    const [data, setData] = useState<DashboardData>(generateMockData());
    const [isLoading, setIsLoading] = useState(false);
    const [error] = useState<string | null>(null);

    // 실시간 데이터 업데이트 시뮬레이션
    useEffect(() => {
        const interval = setInterval(() => {
            setData((prevData: DashboardData) => ({
                ...prevData,
                production: {
                    ...prevData.production,
                    goodProduct: 91.1 + (Math.random() - 0.5) * 0.2,
                    rejectedProduct: Math.max(0, (Math.random() - 0.9) * 0.1), // 여기에 콤마 추가
                    currentRate: Math.floor(Math.random() * 10) + 85,
                },
                equipment: prevData.equipment.map((eq: Equipment) => ({
                    ...eq,
                    efficiency: Math.max(80, Math.min(100, eq.efficiency + (Math.random() - 0.5) * 2)),
                })),
                timestamp: new Date(),
            }));
        }, 5000);

        return () => clearInterval(interval);
    }, []);

    const refreshData = () => {
        setIsLoading(true);
        setTimeout(() => {
            setData(generateMockData());
            setIsLoading(false);
        }, 1000);
    };

    return {
        data,
        isLoading,
        error,
        refreshData,
    };
};