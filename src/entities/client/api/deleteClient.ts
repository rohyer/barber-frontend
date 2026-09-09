import type { DeleteClient } from './client.contract';
import { apiClient } from '../../../shared/services/api.service';
import type { Result } from '../../../shared/utils/result';

export const deleteClient = async (
    clientId: DeleteClient['clientId']
): Promise<Result<DeleteClient['response']>> => {
    const url = `http://localhost:80/api/clients/${clientId}`;

    const response = await apiClient<DeleteClient['response']>({ method: 'DELETE', url });

    return response;
};