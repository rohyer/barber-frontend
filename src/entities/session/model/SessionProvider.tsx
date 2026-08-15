import { useEffect, useState, type ReactNode } from 'react';
import { SessionContext } from './SessionContext';
import { type User } from './session.type';
import { getMe } from '../api/getMe';

type Props = {
    children: ReactNode
};

export function SessionProvider({ children }: Props) {
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

    const contextValue = {
        user,
        setUser,
        isLoading,
        setIsLoading
    };

    return (
        <SessionContext.Provider value={contextValue}>
            {children}
        </SessionContext.Provider>
    );
}

