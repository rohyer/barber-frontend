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

export const getMe = () => {
    const url = 'http://localhost:80/api/auth/me';

    const response = apiClient<Response>({ url, method: 'GET' });

    return response;
};