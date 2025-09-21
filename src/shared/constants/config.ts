export const DASHBOARD_CONFIG = {
    UPDATE_INTERVAL: 2000, // 2초
    CHART_DATA_POINTS: 20,
    MAX_RETRIES: 3,
};

export const EQUIPMENT_STATUSES = {
    RUNNING: 'RUNNING',
    BLOCKED: 'BLOCKED',
    STARVED: 'STARVED',
    DOWN: 'DOWN',
} as const;

export const COLORS = {
    PRIMARY: '#00D4FF',
    SUCCESS: '#4CAF50',
    WARNING: '#FF9800',
    ERROR: '#F44336',
    INFO: '#2196F3',
    BACKGROUND: 'rgba(0, 0, 0, 0.4)',
    OVERLAY: 'rgba(0, 0, 0, 0.3)',
} as const;

export const ANIMATION = {
    TRANSITION_DURATION: '0.3s',
    EASING: 'ease',
} as const;