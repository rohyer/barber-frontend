import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../modules/auth/hooks/useAuth';

export function PublicRoutes() {
    const { user } = useAuth();

    if (user !== null)
        return <Navigate to="/" />;

    return <Outlet />;
}