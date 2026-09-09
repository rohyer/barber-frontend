import { apiClient } from '../../../shared/services/api.service';
import type { Result } from '../../../shared/utils/result';
import type { GetClients } from './client.contract';

export const getClients = async (
    page: number | undefined,
    query: string,
): Promise<Result<GetClients['response']>> => {
    const url = `http://localhost:80/api/clients?page=${page}&query=${query}`;

    const response = await apiClient<GetClients['response']>({ method: 'GET', url });

    return response;
};