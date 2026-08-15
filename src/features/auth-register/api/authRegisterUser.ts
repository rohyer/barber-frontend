import type { RegisterUser } from '../model/authRegisterUser.type';
import { apiClient } from '../../../shared/services/api.service';

export const authRegisterUser = (body: RegisterUser['body']) => {
    const url = 'http://localhost:80/api/auth/register';

    const response = apiClient<RegisterUser['response'], RegisterUser['body']>({
        url, method: 'POST', payload: body
    });

    return response;
};