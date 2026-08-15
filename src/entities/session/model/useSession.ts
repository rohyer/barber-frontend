import { useContext } from 'react';
import { SessionContext } from './SessionContext';

export const useSession = () => {
    const context = useContext(SessionContext);

    if (context === null)
        throw new Error('useAuth must be used within an AuthProvider');

    return context;
};