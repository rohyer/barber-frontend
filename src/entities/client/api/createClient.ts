import { apiClient } from '../../../shared/api/apiClient';
import type { Result } from '../../../shared/lib/result';
import type { ClientModel } from '../model/client.type';

type Payload = Pick<ClientModel,
    | 'name'
    | 'sex'
    | 'phone'
    | 'address'
    | 'birth'>

export type CreateClient = {
    payload: Payload,
    response: ClientModel,
}

export const createClient = async (
    payload: CreateClient['payload']
): Promise<Result<CreateClient['response']>> => {
    const url = 'http://localhost:80/api/clients';

    const response = await apiClient<CreateClient['response'], CreateClient['payload']>(
        { method: 'POST', url, payload }
    );

    return response;
};