import { apiClient } from '../../../shared/services/api.service';

export const authLogoutUser = () => {
    const url = 'http://localhost:80/api/auth/logout';

    const response = apiClient({ url, method: 'POST' });

    return response;
};