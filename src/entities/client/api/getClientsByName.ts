import { apiClient } from '@/shared/api';
import type { ApiResponse } from '@/shared/api/apiResponse';

import type { ClientModel } from '../model/client.type';

type Data = {
    clients: ClientModel[],
    total: number,
}

type Response = ApiResponse<Data>

export const getClientsByName = async (
    page: number | undefined,
    query: string,
): Promise<Response> => {
    const url = `http://localhost:80/api/clients/options?page=${page}&query=${query}`;

    const response = await apiClient<Response>({ method: 'GET', url });

    return response;
};