import { type ReactNode,useEffect, useState } from 'react';

import { getMe } from '../api/getMe';
import { type User } from './session.type';
import { SessionContext } from './SessionContext';

type Props = {
    children: ReactNode
};

export function SessionProvider({ children }: Props) {
    const [user, setUser] = useState<User | undefined>(undefined);

    const [isLoading, setIsLoading] = useState(true);
    
    useEffect(() => {
        const controller = new AbortController();
        
        const fetchMe = async() => {
            setIsLoading(true);

            try {
                const response = await getMe({ signal: controller.signal });
                
                setUser(response);
            } catch (error) {
                if (error instanceof DOMException && error.name === 'AbortError')
                    return;

                setUser(undefined);
            } finally {
                setIsLoading(false);
            }

        };
            
        fetchMe();

        return () => controller.abort();
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

