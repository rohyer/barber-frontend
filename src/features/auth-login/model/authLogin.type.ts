import type { User } from '@/entities/session';

export type FormValues = {
    email: string,
    password: string,
}

export type Credentials = Pick<User, 'email'> & {
    password: string,
}