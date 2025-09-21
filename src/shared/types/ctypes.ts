export interface Equipment {
    id: string;
    name: string;
    status: 'RUNNING' | 'BLOCKED' | 'STARVED' | 'DOWN';
    efficiency: number;
}

export interface ProductionData {
    goodProduct: number;
    rejectedProduct: number;
    targetRate: number;
    currentRate: number;
}

export interface ProcessNode {
    id: string;
    name: string;
    type: 'input' | 'process' | 'output';
    status: 'active' | 'inactive' | 'warning' | 'error';
    x: number;
    y: number;
}

export interface DashboardData {
    equipment: Equipment[];
    production: ProductionData;
    processNodes: ProcessNode[];
    timestamp: Date;
}
