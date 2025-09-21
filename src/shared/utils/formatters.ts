
export const formatNumber = (value: number, decimals: number = 1): string => {
    return value.toFixed(decimals);
};

export const formatPercentage = (value: number): string => {
    return `${value.toFixed(1)}%`;
};

export const formatTime = (date: Date): string => {
    return date.toLocaleTimeString('en-US', {
        hour12: true,
        hour: 'numeric',
        minute: '2-digit'
    });
};

export const formatStatus = (status: string): string => {
    return status.charAt(0).toUpperCase() + status.slice(1).toLowerCase();
};

export const getStatusColor = (status: string): string => {
    const statusColors: Record<string, string> = {
        RUNNING: '#4CAF50',
        BLOCKED: '#2196F3',
        STARVED: '#FF9800',
        DOWN: '#F44336',
        ACTIVE: '#4CAF50',
        INACTIVE: '#9E9E9E',
        WARNING: '#FF9800',
        ERROR: '#F44336'
    };

    return statusColors[status.toUpperCase()] || '#9E9E9E';
};