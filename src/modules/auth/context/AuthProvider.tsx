import { useCallback, useEffect, useState, type ReactNode } from 'react';
import { AuthContext } from './AuthContext';
import type { Credentials, User } from '../auth.type';
import { getMe, loginUser } from '../auth.service';

type Props = {
    children: ReactNode
};

const USER_STORAGE_KEY = 'user';

export function AuthProvider({ children }: Props) {
    const [user, setUser] = useState<User | undefined>(undefined);

    const [isLoading, setIsLoading] = useState(true);
    
    useEffect(() => {
        const fetchMe = async() => {
            setIsLoading(true);

            const response = await getMe();

            const { data } = response;

            setUser(data?.data);

            setIsLoading(false);
        };
        
        fetchMe();
    }, []);

    const logout = useCallback(() => {
        setUser(undefined);
    }, []);

    const login = useCallback(async (credentials: Credentials) => {
        setIsLoading(true);

        const response = await loginUser(credentials);

        setIsLoading(false);

        if (!response)  {
            logout();

            return false;
        }

        const { data } = response;

        setUser(data?.data);
        
        return true;
    }, [logout]);

    const contextValue = {
        user,
        isLoading,
        login,
        logout,
    };

    return (
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
    );
}

