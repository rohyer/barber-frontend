import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../modules/auth/hooks/useAuth';
import { Flex, Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

export function PrivateRoutes() {
    const { isLoggedIn, isLoading } = useAuth();

    if (isLoading) 
        return (
            <Flex justify='center' align='center' style={{ height: '100vh' }}>
                <Spin indicator={<LoadingOutlined />} size='large' />
            </Flex>
        );

    if (!isLoggedIn)
        return <Navigate to='/login' />;

    return <Outlet />;
}