export type User = {
    id: number,
    name: string,
    email: string,
    state: string,
    city: string,
    phone: string,
    status: 0 | 1,
    createdAt: string | null,
    emailToken: string | null,
    emailTokenExpires: string |null,
    newEmail: string | null,
    premiumExpiresAt: string | null,
}

export type Credentials = {
    email: User['email'],
    password: string,
}

export type AuthContextType = {
    user: User | null,
    isLoading: boolean,
    login: (credentials: Credentials) => Promise<boolean | undefined>,
    logout: () => void,
}