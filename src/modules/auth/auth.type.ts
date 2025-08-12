export type User = {
    id: number,
    name: string,
    email: string,
    password: string,
    state: string,
    city: string,
    phone: string,
    status: 0 | 1,
    createdAt: string,
    emailToken: string | null,
    emailTokenExpires: string |null,
    newEmail: string | null,
    premiumExpiresAt: string | null,
}

export type Credentials = {
    email: User['email'],
    password: User['password'],
}

export type AuthContextType = {
    user: User | null,
    token: string | null,
    isLoggedIn: boolean,
    isLoading: boolean,
    login: (credentials: Credentials) => Promise<boolean | undefined>,
    logout: () => void,
}