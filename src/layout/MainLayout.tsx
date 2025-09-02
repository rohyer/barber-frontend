
import { Layout, Menu, theme } from 'antd';
import { Header } from './components/Header';
import { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { Outlet } from 'react-router-dom';

const { Sider, Content } = Layout;

const MainLayout = () => {
    const [collapsed, setCollapsed] = useState(false);
    
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();

    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Sidebar collapsed={collapsed} />

            <Layout>
                <Header
                    collapsed={collapsed}
                    setCollapsed={setCollapsed}
                />
                <Content
                    style={{
                        margin: '24px 16px',
                        padding: 24,
                        minHeight: 280,
                        background: colorBgContainer,
                        borderRadius: borderRadiusLG,
                    }}
                >
                    <Outlet />
                </Content>
            </Layout>
        </Layout>
    );
};

export default MainLayout;