import { apiClient } from '@/shared/api';
import type { Result } from '@/shared/lib';

import type { ClientModel } from '../model/client.type';

type Response = {
    clients: ClientModel[],
    total: number,
}

export const getClients = async (
    page: number | undefined,
    query: string,
): Promise<Result<Response>> => {
    const url = `http://localhost:80/api/clients?page=${page}&query=${query}`;

    const response = await apiClient<Response>({ method: 'GET', url });

    return response;
};