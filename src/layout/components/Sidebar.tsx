import { Layout, Menu } from 'antd';
import {
    UserOutlined,
    ToolOutlined,
    ScheduleOutlined
} from '@ant-design/icons';
import { Link } from 'react-router-dom';

const { Sider } = Layout;

export function Sidebar({ collapsed }: { collapsed: boolean}) {
    return (
        <Sider trigger={null} collapsible collapsed={collapsed} width={250}>
            <Menu
                theme="dark"
                mode="inline"
                defaultSelectedKeys={['1']}
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