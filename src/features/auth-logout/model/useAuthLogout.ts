import { useSession } from '@/entities/session';

import { authLogoutUser } from '../api/authLogoutUser';

export function useAuthLogout() {
    const { setUser } = useSession();

    const logout = async () => {
        await authLogoutUser();
        setUser(undefined);
    };

    return { logout };
}