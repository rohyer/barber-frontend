import { Layout, Menu, theme, Typography } from 'antd';
import {
    UserOutlined,
    ToolOutlined,
    ScheduleOutlined,
} from '@ant-design/icons';
import { Link } from 'react-router-dom';
import style from './Sidebar.module.css';
import BarberPrimeLogo from '../../../src/assets/BarberPrimeLogo.png';

const { Sider } = Layout;

export function Sidebar({ collapsed }: { collapsed: boolean}) {
    const {
        token: { colorBgContainer },
    } = theme.useToken();
    
    return (
        <Sider
            trigger={null}
            collapsible
            collapsed={collapsed}
            width={250}
            style={{ backgroundColor: colorBgContainer }}
        >
            <div className={style.logo}>
                <img src={BarberPrimeLogo} alt="" className={style.iconLogo} />
                
                <Typography.Text
                    className={style.titleLogo}
                    style={{ visibility: collapsed ? 'hidden' : 'visible' }}
                >
                    Barber Prime
                </Typography.Text>
            </div>

            <Menu
                theme="light"
                mode="inline"
                defaultSelectedKeys={['1']}
                style={{ backgroundColor: colorBgContainer }}
                items={[
                    {
                        key: '1',
                        icon: <ScheduleOutlined style={{ fontSize: '20px' }} />,
                        label: <Link to="/atendimentos">Atendimentos</Link>,
                    },
                    {
                        key: '2',
                        icon: <UserOutlined style={{ fontSize: '20px' }} />,
                        label: <Link to="/clientes">Clientes</Link>,
                    },
                    {
                        key: '3',
                        icon: <UserOutlined style={{ fontSize: '20px' }} />,
                        label: <Link to="/colaboradores">Colaboradores</Link>,
                    },
                    {
                        key: '4',
                        icon: <ToolOutlined style={{ fontSize: '20px' }} />,
                        label: <Link to="/servicos">Serviços</Link>,
                        
                    },
                ]}
            />
        </Sider>
    );
}