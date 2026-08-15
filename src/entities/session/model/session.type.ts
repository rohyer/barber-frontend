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

export type SessionContextType = {
    user?: User,
    isLoading: boolean,
    setUser: (user: User | undefined) => void,
    setIsLoading: (loading: boolean) => void
}