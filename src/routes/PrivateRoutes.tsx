import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../modules/auth/hooks/useAuth';

export function PrivateRoutes() {
    const { isLoggedIn } = useAuth();

    if (!isLoggedIn)
        return <Navigate to='/login' />;

    return <Outlet />;
}