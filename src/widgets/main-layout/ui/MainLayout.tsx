
import { Layout, theme } from 'antd';
import { useState } from 'react';
import { Outlet } from 'react-router-dom';

import { Header } from '@/widgets/header';
import { Sidebar } from '@/widgets/sidebar';

const { Content } = Layout;

export function MainLayout() {
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