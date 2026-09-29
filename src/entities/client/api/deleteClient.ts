import { apiClient } from '@/shared/api';
import type { Result } from '@/shared/lib';
import type { ClientModel } from '../model/client.type';

type DeleteClient = {
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