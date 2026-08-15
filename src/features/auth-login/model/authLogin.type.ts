import type { User } from '../../../entities/session/model/session.type';

export type FormValues = {
    email: string,
    password: string,
}

export type Credentials = {
    email: User['email'],
    password: string,
}

type Response<T> = {
    success: boolean,
    message: string,
    fromCache: boolean,
    data: T,
}

export type LoginUser = {
    body: {
        email: string,
        password: string,
    }
    response: Response<User>
}