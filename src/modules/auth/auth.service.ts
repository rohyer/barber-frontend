import { apiClient } from '../../shared/services/api.service';
import type { LoginUser, RegisterUser } from './auth.contract';

export const registerUser = (body: RegisterUser['body']) => {
    const url = 'http://localhost:80/api/auth/register';

    const response = apiClient<RegisterUser['response'], RegisterUser['body']>({
        url, method: 'POST', payload: body
    });

    return response;
};

export const loginUser = (body: LoginUser['body']) => {
    const url = 'http://localhost:80/api/auth/login';

    const response = apiClient<LoginUser['response'], LoginUser['body']>(
        { url, method: 'POST', payload: body }
    );

    return response;
    
};

export const getMe = () => {
    const url = 'http://localhost:80/api/auth/me';

    const response = apiClient<LoginUser['response']>({ url, method: 'GET' });

    return response;
};