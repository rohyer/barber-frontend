import type { ClientModel } from '../model/client.type';

type ClientPayload = Pick<ClientModel,
    | 'name'
    | 'sex'
    | 'phone'
    | 'address'
    | 'birth'>

export type GetClientsResponse = {
    clients: ClientModel[],
    total: number,
}

export type GetClientsByNameResponse = {
    clients: ClientModel['name'][],
}

export type CreateClient = {
    payload: ClientPayload,
    response: ClientModel,
}

export type UpdateClient = {
    clientId: ClientModel['id'],
    payload: ClientPayload,
    response: ClientModel,
}

export type DeleteClient = {
    clientId: ClientModel['id'],
    response: ClientModel['id'],
}