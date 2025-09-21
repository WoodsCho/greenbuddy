import React from 'react';
import { useDashboardData } from './hooks/useDashboardData';
import DashboardLayout from '../../layouts/DashboardLayout';
import LoadingSpinner from '../../shared/components/LoadingSpinner';
import ErrorBoundary from '../../shared/components/ErrorBoundary';

interface DashboardServiceProps {
    children?: React.ReactNode;
}

const DashboardService: React.FC<DashboardServiceProps> = ({ children }) => {
    const { data, isLoading, error, refreshData } = useDashboardData();

    if (error) {
        return (
            <div className="error-container">
                <h2>대시보드 로딩 중 오류가 발생했습니다</h2>
                <p>{error}</p>
                <button onClick={refreshData} className="retry-button">
                    다시 시도
                </button>
            </div>
        );
    }

    // 데이터가 없을 때도 기본값으로 렌더링
    if (!data) {
        return <LoadingSpinner message="스마트팜 데이터를 불러오는 중..." />;
    }

    return (
        <ErrorBoundary>
            {isLoading && <LoadingSpinner message="데이터 업데이트 중..." />}
            <DashboardLayout data={data}>
                {children}
            </DashboardLayout>
        </ErrorBoundary>
    );
};

export default DashboardService;