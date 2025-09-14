type Data = {
    id: number,
    name: string,
    sex: 'M' | 'F' | 'Outro',
    phone: string,
    address: string,
    birth: string,
}

export type GetClients = {
    success: boolean,
    message: string,
    data: Data[],
}

type Body = {
    name: string,
    sex: 'M' | 'F' | 'Outro',
    phone: string,
    address?: string,
    birth?: string,
}

type Response = {
    success: boolean,
    message: string,
    data: Data,
}

export type CreateClient = {
    body: Body,
    response: Response,
}

export type UpdateClient = {
    body: Body
    response: Response,
    dataData: Data,
}

export type DeleteClient = {
    response: Response;
    data: {
        id: number,
        affectedRows: number,
    }
}