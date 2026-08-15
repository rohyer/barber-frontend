import { Navigate, Outlet } from 'react-router-dom';
import { useSession } from '../../entities/session/model/useSession';
import { Flex, Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

export function PrivateRoutes() {
    const { user, isLoading } = useSession();

    if (isLoading) 
        return (
            <Flex justify='center' align='center' style={{ height: '100vh' }}>
                <Spin indicator={<LoadingOutlined />} size='large' />
            </Flex>
        );

    if (user === undefined)
        return <Navigate to='/login' />;

    return <Outlet />;
}