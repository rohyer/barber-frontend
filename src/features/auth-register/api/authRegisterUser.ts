import { apiClient } from '@/shared/api';

import type { RegisterUser } from '../model/authRegisterUser.type';

export const authRegisterUser = (body: RegisterUser['body']) => {
    const url = 'http://localhost:80/api/auth/register';

    const response = apiClient<RegisterUser['response'], RegisterUser['body']>({
        url, method: 'POST', payload: body
    });

    return response;
};