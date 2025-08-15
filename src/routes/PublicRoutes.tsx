import { Navigate } from 'react-router-dom';
import { useAuth } from '../modules/auth/hooks/useAuth';

export function PublicRoutes() {
    const { isLoggedIn } = useAuth();

    if (isLoggedIn)
        return <Navigate to="/" />;
}