import { useState, useEffect, useCallback } from 'react';

interface RealtimeDataOptions {
    interval?: number;
    autoStart?: boolean;
}

export const useRealtimeData = <T>(
    dataGenerator: () => T,
    options: RealtimeDataOptions = {}
) => {
    const { interval = 1000, autoStart = true } = options;
    const [data, setData] = useState<T>(dataGenerator());
    const [isActive, setIsActive] = useState(autoStart);

    const updateData = useCallback(() => {
        setData(dataGenerator());
    }, [dataGenerator]);

    useEffect(() => {
        if (!isActive) return;

        const intervalId = setInterval(updateData, interval);
        return () => clearInterval(intervalId);
    }, [isActive, interval, updateData]);

    const start = () => setIsActive(true);
    const stop = () => setIsActive(false);
    const toggle = () => setIsActive(prev => !prev);

    return {
        data,
        isActive,
        start,
        stop,
        toggle,
        updateData,
    };
};