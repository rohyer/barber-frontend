import type { LoginUser } from '../../../modules/auth/auth.contract';
import { apiClient } from '../../../shared/services/api.service';

export const getMe = () => {
    const url = 'http://localhost:80/api/auth/me';

    const response = apiClient<LoginUser['response']>({ url, method: 'GET' });

    return response;
};