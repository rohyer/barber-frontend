import type { User } from './auth.type';

type Response<T> = {
    success: boolean,
    message: string,
    fromCache: boolean,
    data: T,
}

type Body = {
    name: string,
    email: string,
    password: string,
    confirmPassword: string,
    state: string,
    city: string,
    phone: string,
}

export type RegisterUser = {
    body: Body,
    response: Response<Pick<Body,
        | 'name'
        | 'email'
        | 'state'
        | 'city'
        | 'phone'
    >>,
}

export type LoginUser = {
    body: Pick<Body, 'email' | 'password'>
    response: Response<User>
}