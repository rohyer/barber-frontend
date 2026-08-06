import type { Dispatch, SetStateAction } from "react"

export type User = {
    // id: number,
    name: string,
    email: string,
    state: string,
    city: string,
    phone: string,
    premiumExpiresAt: string | null,
    // status: 0 | 1,
    // createdAt: string | null,
    // emailToken: string | null,
    // emailTokenExpires: string |null,
    // newEmail: string | null,
}

export type Credentials = {
    email: User['email'],
    password: string,
}

export type AuthContextType = {
    user?: User,
    isLoading: boolean,
    login: (credentials: Credentials) => Promise<boolean | undefined>,
    logout: () => void,
}