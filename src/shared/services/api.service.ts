type ApiClientOptions<T> = {
    method: 'GET' | 'POST' | 'PUT' | 'DELETE';
    url: string,
    body?: T,
}

type ApiErrorResponse = {
    error?: string,
    message?: string,
}

export const apiClient = async<TResponse, TBody = unknown>(
    option: ApiClientOptions<TBody>
): Promise<TResponse | null> => {
    try {
        const token = localStorage.getItem('authToken');

        const response = await fetch(option.url, {
            method: option.method,
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            body: option.body ? JSON.stringify(option.body) : undefined,
        });

        const data: TResponse | ApiErrorResponse | null = await response.json().catch(() => null);

        if (!response.ok) {
            const message = (data as ApiErrorResponse).message || `Erro na requisição ${response.status}`;

            throw new Error(message);
        }

        return data as TResponse;
    } catch(error) {
        console.error('Erro na API', error);
        throw error;
    }
};