import { apiClient } from '@/shared/api';

import type { User } from '../model/session.type';

export type Response = Pick<User,
    | 'name'
    | 'email'
    | 'city'
    | 'state'
    | 'phone'
    | 'premiumExpiresAt'
    >

export const getMe = ({ signal }: { signal: AbortController['signal']}) => {
    const url = 'http://localhost:80/api/auth/me';

    const response = apiClient<Response>({ url, method: 'GET', signal });

    return response;
};