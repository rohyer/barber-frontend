import { apiClient } from '@/shared/api';

import type { ClientModel } from '../model/client.type';

type DeleteClient = {
    clientId: ClientModel['id'],
}

export const deleteClient = async (
    clientId: DeleteClient['clientId']
): Promise<void> => {
    const url = `http://localhost:80/api/clients/${clientId}`;

    await apiClient<void>({ method: 'DELETE', url });
};