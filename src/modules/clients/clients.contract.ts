import type { ClientModel } from './clients.type';

type ClientPayload = Pick<ClientModel,
    | 'name'
    | 'sex'
    | 'phone'
    | 'address'
    | 'birth'>

type Response<T> = {
    success: boolean,
    message: string,
    fromCache: boolean,
    data: T,
}

export type GetClients = {
    response: Response<{
        clients: ClientModel[],
        total: number,
    }>
}

export type GetClientsByName = {
    response: Response<{
        clients: ClientModel['name'][],
    }>
}

export type CreateClient = {
    payload: ClientPayload,
    response: Response<ClientModel>,
}

export type UpdateClient = {
    clientId: ClientModel['id'],
    payload: ClientPayload,
    response: Response<ClientModel>,
}

export type DeleteClient = {
    clientId: ClientModel['id'],
    response: Response<ClientModel['id']>,
}