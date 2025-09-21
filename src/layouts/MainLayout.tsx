
import React from 'react';
import Header from '../shared/components/Header';
import '../styles/global.css';

interface MainLayoutProps {
    children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
    return (
        <div className="main-layout">
            <Header />
            <main className="main-content">
                {children}
            </main>
        </div>
    );
};

export default MainLayout;