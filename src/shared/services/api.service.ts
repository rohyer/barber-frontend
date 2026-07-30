import { fail, ok, type ApiError, type Result } from '../utils/result';

type ApiClientOptions<T> = {
    method: 'GET' | 'POST' | 'PUT' | 'DELETE';
    url: string,
    payload?: T,
}

export const apiClient = async<TResponse, TPayload = void>(
    option: ApiClientOptions<TPayload>
): Promise<Result<TResponse>> => {
    try {
        const response = await fetch(option.url, {
            method: option.method,
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: option.payload ? JSON.stringify(option.payload) : undefined,
        });

        if (response.status === 401) {
            window.location.href = '/login';
            return fail({ message: 'Usuário não autorizado', status: response.status });
        }

        if (response.status >= 500) 
            return fail({ message: 'Ocorreu um erro no servidor', status: response.status });
        
        if (!response.ok) {
            const errorData: ApiError | null = await response.json().catch(() => null);
            const message = errorData?.message || `Erro na requisição ${response.status}`;

            return fail({ message: message, status: response.status });
        }
        
        const data: TResponse = await response.json();
        
        return ok(data);
    } catch(error) {
        return fail({ message: 'Erro de rede' });
    }
};