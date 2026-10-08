import { ApiError } from './apiError';

type ApiClientOptions<T> = {
    method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
    url: string,
    payload?: T,
    signal?: AbortSignal,
}

export const apiClient = async<TResponse, TPayload = void>(
    option: ApiClientOptions<TPayload>
): Promise<TResponse> => {
    let response: Response;

    const body = option.payload !== undefined ? JSON.stringify(option.payload) : undefined;

    try {
        response = await fetch(option.url, {
            method: option.method,
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body,
            signal: option.signal,
        });
    } catch(error) {
        if (error instanceof DOMException && error.name === 'AbortError') throw error;

        throw new ApiError('Erro de rede');
    }

    if (response.status === 401)
        throw new ApiError('Usuário não autorizado', 401);

    if (response.status >= 500)
        throw new ApiError('Ocorreu um erro no servidor', response.status);
        
    if (!response.ok) {
        const errorData: { message?: string } | null = await response.json().catch(() => null);
        const message = errorData?.message || `Erro na requisição ${response.status}`;

        throw new ApiError(message, response.status);
    }

    const text = await response.text();

    if (text === '') return undefined as TResponse;

    try {
        return JSON.parse(text) as TResponse;
    } catch {
        throw new ApiError('Resposta inválida do servidor', response.status);
    }    
};