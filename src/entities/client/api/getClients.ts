import { apiClient } from '../../../shared/api/apiClient';
import type { Result } from '../../../shared/lib/result';
import type { GetClientsResponse } from './client.contract';

export const getClients = async (
    page: number | undefined,
    query: string,
): Promise<Result<GetClientsResponse>> => {
    const url = `http://localhost:80/api/clients?page=${page}&query=${query}`;

    const response = await apiClient<GetClientsResponse>({ method: 'GET', url });

    return response;
};