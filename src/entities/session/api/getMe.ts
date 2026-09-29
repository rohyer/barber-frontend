import type { LoginUser } from '@/features/auth-login/model/authLogin.type';
import { apiClient } from '@/shared/api';

export const getMe = () => {
    const url = 'http://localhost:80/api/auth/me';

    const response = apiClient<LoginUser['response']>({ url, method: 'GET' });

    return response;
};