
import { ProductionMetricsProps } from '../types/dashboard.types';

const ProductionMetrics: React.FC<ProductionMetricsProps> = ({ production }) => {
    // production이 없을 경우 기본값 사용
    const goodProduct = production?.goodProduct ?? 0;
    const rejectedProduct = production?.rejectedProduct ?? 0;

    return (
        <div className="production-metrics">
            <div className="metric-card good-product">
                <h4>양질 작물</h4>
                <div className="metric-value">{goodProduct.toFixed(1)}</div>
                <div className="metric-unit">kg</div>
                <div className="metric-chart">
                    <div className="chart-area">
                        <svg width="100%" height="60">
                            <polyline
                                points="0,30 20,25 40,20 60,15 80,25 100,20"
                                fill="none"
                                stroke="#4CAF50"
                                strokeWidth="2"
                            />
                        </svg>
                    </div>
                </div>
            </div>

            <div className="metric-card rejected-product">
                <h4>불량 작물</h4>
                <div className="metric-value">{rejectedProduct.toFixed(1)}</div>
                <div className="metric-unit">kg</div>
                <div className="rejected-icon"></div>
            </div>
        </div>
    );
};

export default ProductionMetrics;