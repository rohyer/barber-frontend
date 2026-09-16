import { apiClient } from '../../../shared/api/apiClient';
import type { Result } from '../../../shared/lib/result';
import type { ClientModel } from '../model/client.type';

export type DeleteClient = {
    clientId: ClientModel['id'],
    response: ClientModel['id'],
}

export const deleteClient = async (
    clientId: DeleteClient['clientId']
): Promise<Result<DeleteClient['response']>> => {
    const url = `http://localhost:80/api/clients/${clientId}`;

    const response = await apiClient<DeleteClient['response']>({ method: 'DELETE', url });

    return response;
};