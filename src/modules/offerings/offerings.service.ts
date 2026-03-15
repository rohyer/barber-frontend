import { apiClient } from '../../shared/services/api.service';
import type { GetOfferings } from './offerings.contract';

export const getOfferings = async (): Promise<GetOfferings['response']> => {
    const url = 'http://localhost:80/api/offerings';

    const response = await apiClient<GetOfferings['response']>({ method: 'GET', url });

    return response;
};