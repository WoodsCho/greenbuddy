import { Equipment, ProductionData, DashboardData } from '../../../shared/types/ctypes';

export interface EquipmentStatusProps {
    equipment: Equipment[];
}

export interface ProductionMetricsProps {
    production: ProductionData;
}

export interface QualityControlProps {
    goodProduct: number;
    rejectedProduct: number;
}

export type EquipmentStatus = 'RUNNING' | 'BLOCKED' | 'STARVED' | 'DOWN';

export interface ChartDataPoint {
    time: string;
    value: number;
}

// Re-export common types for convenience
export type { Equipment, ProductionData, DashboardData };