import { Button, Layout, theme } from 'antd';
import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
} from '@ant-design/icons';

const { Header: HeaderAntD } = Layout;

export function Header({
    collapsed,
    setCollapsed,
}: { collapsed: boolean, setCollapsed: React.Dispatch<React.SetStateAction<boolean>>}) {
    const {
        token: { colorBgContainer },
    } = theme.useToken();

    return (
        <HeaderAntD style={{ padding: 0, background: colorBgContainer }}>
            <Button
                type="text"
                icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                onClick={() => setCollapsed(!collapsed)}
                style={{
                    fontSize: '16px',
                    width: 64,
                    height: 64,
                }}
            />
        </HeaderAntD>
    );
}