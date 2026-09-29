import { apiClient } from '@/shared/api';
import type { Result } from '@/shared/lib';

import type { OfferingModel } from '../model/offering.type';

export type DeleteOffering = {
    offeringId: OfferingModel['id'],
    response: OfferingModel['id'],
}

export const deleteOffering = async (
    offeringId: DeleteOffering['offeringId']
): Promise<Result<DeleteOffering['response']>> => {
    const url = `http://localhost:80/api/offerings/${offeringId}`;

    const response = await apiClient<DeleteOffering['response']>({ method: 'DELETE', url });

    return response;
};