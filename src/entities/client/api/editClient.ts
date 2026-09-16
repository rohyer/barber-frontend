import { apiClient } from '../../../shared/api/apiClient';
import type { Result } from '../../../shared/lib/result';
import type { ClientModel } from '../model/client.type';

type Payload = Pick<ClientModel,
    | 'name'
    | 'sex'
    | 'phone'
    | 'address'
    | 'birth'>

export type UpdateClient = {
    clientId: ClientModel['id'],
    payload: Payload,
    response: ClientModel,
}

export const editClient = async (
    clientId: UpdateClient['clientId'],
    payload: UpdateClient['payload'],
): Promise<Result<UpdateClient['response']>> => {
    const url = `http://localhost:80/api/clients/${clientId}`;

    const response = await apiClient<UpdateClient['response'], UpdateClient['payload']>(
        { method: 'PUT', url, payload }
    );

    return response;
};