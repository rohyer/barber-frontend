import { apiClient } from '@/shared/api';
import type { Result } from '@/shared/lib';
import type { OfferingModel } from '../model/offering.type';

type Payload = Pick<OfferingModel,
    | 'name'
    | 'value'
    | 'duration'
> & {
    employeeIds: number[]
}

export type CreateOffering = {
    payload: Payload,
    response: OfferingModel,
}

export const createOffering = async (
    payload: CreateOffering['payload']
): Promise<Result<CreateOffering['response']>> => {
    const url = 'http://localhost:80/api/offerings';

    const response = await apiClient<CreateOffering['response'], CreateOffering['payload']>({
        method: 'POST',
        url,
        payload
    });

    return response;
};