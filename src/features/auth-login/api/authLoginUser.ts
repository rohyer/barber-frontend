import type { User } from '@/entities/session';
import { apiClient } from '@/shared/api';

type Response = Pick<User,
    | 'name'
    | 'email'
    | 'city'
    | 'state'
    | 'phone'
    | 'premiumExpiresAt'
>

type Body = Pick<User, 'email'> & {
    password: string,
}

export const authLoginUser = (body: Body) => {
    const url = 'http://localhost:80/api/auth/login';

    const response = apiClient<Response, Body>(
        { url, method: 'POST', payload: body }
    );

    return response;  
};