import { apiClient } from '@/shared/api';

import type { OfferingModel } from '../model/offering.type';

type Response = {
    offerings: OfferingModel[],
}

export const getOfferings = async (): Promise<Response> => {
    const url = 'http://localhost:80/api/offerings';

    const response = await apiClient<Response>({ method: 'GET', url });

    return response;
};