import type { UpdateClient } from './client.contract';
import { apiClient } from '../../../shared/api/apiClient';
import type { Result } from '../../../shared/lib/result';

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