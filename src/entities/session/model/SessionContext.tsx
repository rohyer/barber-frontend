import { createContext } from 'react';
import { type SessionContextType } from './session.type';

export const SessionContext = createContext<SessionContextType | null>(null);