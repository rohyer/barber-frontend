import { useCallback, useEffect, useState, type ReactNode } from 'react';
import { AuthContext } from './AuthContext';
import type { Credentials, User } from '../auth.type';
import { loginUser } from '../auth.service';

type Props = {
    children: ReactNode
};

const AUTH_TOKEN_STORAGE_KEY = 'authToken';

const USER_STORAGE_KEY = 'user';

export function AuthProvider({ children }: Props) {
    const [user, setUser] = useState<User | null>(null);
    const [token, setToken] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    
    useEffect(() => {
        try {
            const storedUser = localStorage.getItem(USER_STORAGE_KEY);
            const storedToken = localStorage.getItem(AUTH_TOKEN_STORAGE_KEY);

            if (!storedUser || !storedToken) {
                setIsLoading(false);
                return;
            }

            const parsedUser = JSON.parse(storedUser);

            if (typeof parsedUser !== 'object') {
                setIsLoading(false);
                return;
            }
            
            // TODO: ainda preciso verificar se é do tipo User
            setUser(parsedUser);
            setToken(storedToken);
        } catch(error) {
            console.error('Failed to load or parse auth data from localStorage: ', error);

            localStorage.removeItem(USER_STORAGE_KEY);
            localStorage.removeItem(AUTH_TOKEN_STORAGE_KEY);

            setUser(null);
            setToken(null);
        } finally {
            setIsLoading(false);
        }
    }, []);

    const logout = useCallback(() => {
        setUser(null);
        setToken(null);

        localStorage.removeItem(USER_STORAGE_KEY);
        localStorage.removeItem(AUTH_TOKEN_STORAGE_KEY);
    }, []);

    const login = useCallback(async (credentials: Credentials) => {
        setIsLoading(true);

        const response = await loginUser(credentials);

        setIsLoading(false);

        if (!response)  {
            logout();
                
            return false;
        }

        const { token, user } = response.data;

        setUser(user);
        setToken(token);

        localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user));
        localStorage.setItem(AUTH_TOKEN_STORAGE_KEY, token);

        return true;
    }, [logout]);

    const contextValue = {
        user,
        token,
        isLoggedIn: !!token,
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

