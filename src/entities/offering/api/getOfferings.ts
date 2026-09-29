import { apiClient } from '@/shared/api';
import type { Result } from '@/shared/lib';

import type { OfferingModel } from '../model/offering.type';

export type Response = {
    offerings: OfferingModel[],
}

export const getOfferings = async (): Promise<Result<Response>> => {
    const url = 'http://localhost:80/api/offerings';

    const response = await apiClient<Response>({ method: 'GET', url });

    return response;
};