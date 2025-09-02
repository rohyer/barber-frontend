import { Avatar, Button, Divider, Flex, Layout, Menu, Popover, theme, Tooltip } from 'antd';
import {
    BellOutlined,
    CreditCardOutlined,
    LogoutOutlined,
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    SettingOutlined,
    StarOutlined,
    UserOutlined,
} from '@ant-design/icons';
import { Link } from 'react-router-dom';

const { Header: HeaderAntD } = Layout;

export function Header({
    collapsed,
    setCollapsed,
}: { collapsed: boolean, setCollapsed: React.Dispatch<React.SetStateAction<boolean>>}) {
    const { token } = theme.useToken();

    const content = (
        <Menu style={{ borderInlineEnd: 'none' }}>
            <Menu.Item key={1} icon={<UserOutlined />}>
                <Link to="/meu-perfil">Meu perfil</Link>
            </Menu.Item>

            <Menu.Item key={2} icon={<CreditCardOutlined />}>
                <Link to="/assinatura">Assinatura</Link>
            </Menu.Item>

            <Menu.Item key={3} icon={<SettingOutlined />}>
                <Link to="/configuracoes">Configurações</Link>
            </Menu.Item>

            <Divider style={{ margin: '0' }} />

            <Menu.Item key={4} icon={<LogoutOutlined />}>
                <Link to="/meu-perfil">Sair</Link>
            </Menu.Item>
        </Menu>
    );

    return (
        <HeaderAntD style={{ padding: '0 30px 0 0', background: token.colorBgContainer, height: '75px' }}>
            <Flex justify='space-between' align='center'>
                <Button
                    type="text"
                    icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                    onClick={() => setCollapsed(!collapsed)}
                    style={{
                        fontSize: '16px',
                        width: 64,
                        height: 75,
                    }}
                />

                <Flex align='center' gap={token.margin}>
                    <Tooltip placement='bottom' title="Adquirir acesso premium">
                        <Avatar
                            icon={<StarOutlined
                                style={{ color: token.colorIcon }}
                            />}
                            style={{ backgroundColor: 'rgba(0,0,0,0.06)' , cursor: 'pointer' }}
                        />
                    </Tooltip>

                    <Tooltip placement='bottom' title="Notificações">
                        <Avatar
                            icon={<BellOutlined
                                style={{ color: token.colorIcon }}
                            />}
                            style={{ backgroundColor: 'rgba(0,0,0,0.06)', cursor: 'pointer' }}
                        />
                    </Tooltip>

                    <Popover placement='bottomRight' content={content} trigger='click'>
                        <Avatar
                            icon={<UserOutlined style={{ color: token.colorPrimary }} />}
                            style={{ backgroundColor: token.colorInfoBg, cursor: 'pointer' }}
                        />
                    </Popover>
                </Flex>
            </Flex>
        </HeaderAntD>
    );
}