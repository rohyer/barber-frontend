import { apiClient } from '@/shared/api';

type Body = {
    name: string,
    email: string,
    password: string,
    confirmPassword: string,
    state: string,
    city: string,
    phone: string,
}

export type Response =  Pick<Body,
    | 'name'
    | 'email'
    | 'state'
    | 'city'
    | 'phone'
>;

export const authRegisterUser = (body: Body) => {
    const url = 'http://localhost:80/api/auth/register';

    const response = apiClient<Response, Body>({
        url, method: 'POST', payload: body
    });

    return response;
};