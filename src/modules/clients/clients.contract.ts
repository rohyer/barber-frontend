type Client = {
    id: number,
    name: string,
    sex: 'M' | 'F' | 'Outro',
    phone: string,
    address: string,
    birth: string,
}

type ClientPayload = Omit<Client, 'id'>

type Response<T> = {
    success: boolean,
    message: string,
    fromCache: boolean,
    data: T,
}

export type GetClients = {
    response: Response<{
        clients: Client[],
        total: number,
    }>
}

export type GetClientsByName = {
    response: Response<{
        clients: Client['name'][],
    }>
}

export type CreateClient = {
    payload: ClientPayload,
    response: Response<Client>,
}

export type UpdateClient = {
    clientId: Client['id'],
    payload: ClientPayload,
    response: Response<Client>,
}

export type DeleteClient = {
    clientId: Client['id'],
    response: Response<Client['id']>,
}