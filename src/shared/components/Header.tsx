const Header: React.FC = () => {
    return (
        <header className="header">
            <div className="header-left">
                <h1 className="logo">SmartFarm</h1>
                <div className="location-info">
                    <span className="location">Greenhouse Central</span>
                    <span className="dropdown-arrow">▼</span>
                </div>
            </div>

            <div className="header-center">
                <h2 className="facility-title">Hydroponic System</h2>
            </div>

            <div className="header-right">
                <button className="run-simulation-btn">환경 시뮬레이션 실행</button>
                <div className="user-info">
                    <span className="time">Jan 24 9:54 pm</span>
                    <div className="user-avatar">
                        <div className="avatar-icon">S</div>
                        <div className="user-details">
                            <span className="user-name">Spencer</span>
                            <span className="user-role">Farm Manager</span>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;