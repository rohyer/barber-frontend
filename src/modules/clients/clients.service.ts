import { apiClient } from '../../shared/services/api.service';
import type { CreateClient, DeleteClient, GetClients, UpdateClient } from './clients.contract';

export const getClients = async (): Promise<GetClients['response']> => {
    const url = 'http://localhost:80/api/clients';

    const response = await apiClient<GetClients['response']>({ method: 'GET', url });

    return response;
};

export const createClient = async (
    payload: CreateClient['payload']
): Promise<CreateClient['response']> => {
    const url = 'http://localhost:80/api/clients';

    const response = await apiClient<CreateClient['response'], CreateClient['payload']>(
        { method: 'POST', url, payload }
    );

    return response;
};

export const updateClient = async (
    clientId: UpdateClient['clientId'],
    payload: UpdateClient['payload'],
): Promise<UpdateClient['response']> => {
    const url = `http://localhost:80/api/clients/${clientId}`;

    const response = await apiClient<UpdateClient['response'], UpdateClient['payload']>(
        { method: 'PUT', url, payload }
    );

    return response;
};

export const deleteClient = async (
    clientId: DeleteClient['clientId']
): Promise<DeleteClient['response']> => {
    const url = `http://localhost:80/api/clients/${clientId}`;

    const response = await apiClient<DeleteClient['response']>({ method: 'DELETE', url });

    return response;
};