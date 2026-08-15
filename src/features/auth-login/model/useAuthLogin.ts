import { authLoginUser } from '../api/authLoginUser';
import { useSession } from '../../../entities/session/model/useSession';
import type { Credentials } from './authLogin.type';

export function useAuthLogin() {
    const { setUser, setIsLoading } = useSession();

    const login = async (credentials: Credentials) => {
        setIsLoading(true);

        const response = await authLoginUser(credentials);

        setIsLoading(false);

        if (!response)  
            return false;

        const { data } = response;

        setUser(data?.data);
        
        return true;
    };

    return { login };
}