import { apiClient } from '../../../shared/api/apiClient';

export const authLogoutUser = () => {
    const url = 'http://localhost:80/api/auth/logout';

    const response = apiClient({ url, method: 'POST' });

    return response;
};