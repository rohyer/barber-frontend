import { LoadingOutlined } from '@ant-design/icons';
import { Flex, Spin } from 'antd';
import { Navigate, Outlet } from 'react-router-dom';

import { useSession } from '@/entities/session';

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