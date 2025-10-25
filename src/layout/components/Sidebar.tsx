import { Layout, Menu, theme, Typography } from 'antd';
import {
    ScissorOutlined,
    ScheduleOutlined,
    LineChartOutlined,
    HomeOutlined,
    IdcardOutlined,
    TeamOutlined,
} from '@ant-design/icons';
import { Link, useLocation } from 'react-router-dom';
import style from './Sidebar.module.css';
import BarberPrimeLogo from '../../../src/assets/BarberPrimeLogo.png';

const { Sider } = Layout;

export function Sidebar({ collapsed }: { collapsed: boolean}) {
    const {
        token: { colorBgContainer },
    } = theme.useToken();

    const location = useLocation();

    const selectedKey = location.pathname;
    
    return (
        <Sider
            trigger={null}
            collapsible
            collapsed={collapsed}
            width={250}
            style={{ backgroundColor: colorBgContainer }}
        >
            <Link to='/' className={style.logo}>
                <img src={BarberPrimeLogo} alt="" className={style.iconLogo} />
                
                <Typography.Text
                    className={style.titleLogo}
                    style={{ visibility: collapsed ? 'hidden' : 'visible' }}
                >
                    Barber Prime
                </Typography.Text>
            </Link>

            <Menu
                theme="light"
                mode="inline"
                selectedKeys={[selectedKey]}
                style={{ backgroundColor: colorBgContainer }}
                items={[
                    {
                        key: '/',
                        icon: <HomeOutlined style={{ fontSize: '20px' }} />,
                        label: <Link to="/">Dashboard</Link>,
                    },
                    {
                        key: '/atendimentos',
                        icon: <ScheduleOutlined style={{ fontSize: '20px' }} />,
                        label: <Link to="/atendimentos">Atendimentos</Link>,
                    },
                    {
                        key: '/clientes',
                        icon: <TeamOutlined style={{ fontSize: '20px' }} />,
                        label: <Link to="/clientes">Clientes</Link>,
                    },
                    {
                        key: '/colaboradores',
                        icon: <IdcardOutlined style={{ fontSize: '20px' }} />,
                        label: <Link to="/colaboradores">Colaboradores</Link>,
                    },
                    {
                        key: '/servicos',
                        icon: <ScissorOutlined style={{ fontSize: '20px' }} />,
                        label: <Link to="/servicos">Serviços</Link>,
                    },
                    {
                        key: '/estatisticas',
                        icon: <LineChartOutlined style={{ fontSize: '20px' }} />,
                        label: <Link to="/estatisticas">Estatísticas</Link>,
                    },
                ]}
            />
        </Sider>
    );
}