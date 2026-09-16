import { apiClient } from '../../../shared/api/apiClient';
import type { Result } from '../../../shared/lib/result';
import type { ClientModel } from '../model/client.type';

export type Response = {
    clients: ClientModel[],
    total: number,
}

export const getClientsByName = async (
    page: number | undefined,
    query: string,
): Promise<Result<Response>> => {
    const url = `http://localhost:80/api/clients/options?page=${page}&query=${query}`;

    const response = await apiClient<Response>({ method: 'GET', url });

    return response;
};