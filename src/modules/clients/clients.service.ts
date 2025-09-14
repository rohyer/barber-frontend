import { apiClient } from '../../shared/services/api.service';
import type { CreateClient, DeleteClient, GetClients, UpdateClient } from './clients.contract';

export const getClients = async (): Promise<GetClients> => {
    const url = 'http://localhost:80/api/clients';

    const response = await apiClient<GetClients>({ method: 'GET', url });

    return response;
};

export const createClient = async (
    body: CreateClient['body']
): Promise<CreateClient['response']> => {
    const url = 'http://localhost:80/api/clients';

    const response = await apiClient<CreateClient['response'], CreateClient['body']>(
        { method: 'POST', url, body }
    );

    return response;
};

export const updateClient = async (
    clientId: number | null | undefined,
    body: UpdateClient['body'],
): Promise<UpdateClient['response']> => {
    const url = `http://localhost:80/api/clients/${clientId}`;

    const response = await apiClient<UpdateClient['response']>({ method: 'PUT', url, body });

    return response;
};

export const deleteClient = async (clientId: number): Promise<DeleteClient['response']> => {
    const url = `http://localhost:80/api/clients/${clientId}`;

    const response = await apiClient<DeleteClient['response']>({ method: 'DELETE', url });

    return response;
};