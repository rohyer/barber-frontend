import { apiClient } from '../../../shared/services/api.service';
import type { LoginUser } from '../model/authLogin.type';

export const authLoginUser = (body: LoginUser['body']) => {
    const url = 'http://localhost:80/api/auth/login';

    const response = apiClient<LoginUser['response'], LoginUser['body']>(
        { url, method: 'POST', payload: body }
    );

    return response;  
};