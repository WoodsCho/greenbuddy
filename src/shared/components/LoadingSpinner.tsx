interface LoadingSpinnerProps {
    size?: 'small' | 'medium' | 'large';
    message?: string;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
                                                           size = 'medium',
                                                           message = '로딩 중...'
                                                       }) => {
    const getSizeClass = () => {
        switch (size) {
            case 'small': return 'spinner-small';
            case 'large': return 'spinner-large';
            default: return 'spinner-medium';
        }
    };

    return (
        <div className="loading-overlay">
            <div className={`loading-spinner ${getSizeClass()}`}>
                <div className="spinner"></div>
                {message && <p className="loading-message">{message}</p>}
            </div>
        </div>
    );
};

export default LoadingSpinner;