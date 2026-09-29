import { apiClient } from '../../../shared/api/apiClient';
import type { Result } from '../../../shared/lib/result';
import type { OfferingModel } from '../model/offering.type';

type Payload = Pick<OfferingModel,
    | 'name'
    | 'value'
    | 'duration'
> & {
    employeeIds: number[]
}

export type UpdateOffering = {
    offeringId: OfferingModel['id'],
    payload: Payload,
    response: OfferingModel,
}

export const updateOffering = async (
    offeringId: UpdateOffering['offeringId'],
    payload: UpdateOffering['payload']
): Promise<Result<UpdateOffering['response']>> => {
    const url = `http://localhost:80/api/offerings/${offeringId}`;

    const response = await apiClient<UpdateOffering['response'], UpdateOffering['payload']>({ method: 'PUT', url, payload });

    return response;
};