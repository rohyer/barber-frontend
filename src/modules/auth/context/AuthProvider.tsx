import { useCallback, useEffect, useState, type ReactNode } from 'react';
import { AuthContext } from './AuthContext';
import type { Credentials, User } from '../auth.type';
import { getMe, loginUser } from '../auth.service';
import { logoutUser } from '../auth.service';

type Props = {
    children: ReactNode
};

export function AuthProvider({ children }: Props) {
    const [user, setUser] = useState<User | undefined>(undefined);

    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchMe = async() => {
            setIsLoading(true);
    
            const response = await getMe();

            if (!response.success) {
                setUser(undefined);
                setIsLoading(false);

                return;
            }
    
            const { data } = response;
    
            setUser(data?.data);
    
            setIsLoading(false);
        };
            
        fetchMe();
    }, [setIsLoading, setUser]);

    const logout = useCallback(async () => {
        const response = await logoutUser();

        console.log(response);

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

