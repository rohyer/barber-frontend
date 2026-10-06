import { useSession } from '@/entities/session';

import { authLoginUser } from '../api/authLoginUser';
import type { Credentials } from './authLogin.type';

export function useAuthLogin() {
    const { setUser, setIsLoading } = useSession();

    const login = async (credentials: Credentials) => {
        setIsLoading(true);

        const response = await authLoginUser(credentials);

        setIsLoading(false);

        if (!response)  
            return false;

        setUser(response);
        
        return true;
    };

    return { login };
}