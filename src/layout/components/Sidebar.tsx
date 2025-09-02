import { Layout, Menu, theme, Typography } from 'antd';
import {
    ScissorOutlined,
    ScheduleOutlined,
    LineChartOutlined,
    HomeOutlined,
    IdcardOutlined,
    TeamOutlined,
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
                defaultSelectedKeys={['1']}
                style={{ backgroundColor: colorBgContainer }}
                items={[
                    {
                        key: '1',
                        icon: <HomeOutlined style={{ fontSize: '20px' }} />,
                        label: <Link to="/">Dashboard</Link>,
                    },
                    {
                        key: '2',
                        icon: <ScheduleOutlined style={{ fontSize: '20px' }} />,
                        label: <Link to="/atendimentos">Atendimentos</Link>,
                    },
                    {
                        key: '3',
                        icon: <TeamOutlined style={{ fontSize: '20px' }} />,
                        label: <Link to="/clientes">Clientes</Link>,
                    },
                    {
                        key: '4',
                        icon: <IdcardOutlined style={{ fontSize: '20px' }} />,
                        label: <Link to="/colaboradores">Colaboradores</Link>,
                    },
                    {
                        key: '5',
                        icon: <ScissorOutlined style={{ fontSize: '20px' }} />,
                        label: <Link to="/servicos">Serviços</Link>,
                    },
                    {
                        key: '6',
                        icon: <LineChartOutlined style={{ fontSize: '20px' }} />,
                        label: <Link to="/estatisticas">Estatísticas</Link>,
                    },
                ]}
            />
        </Sider>
    );
}