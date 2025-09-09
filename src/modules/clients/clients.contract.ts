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
    idAdmin: number,
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

export type DeleteClient = {
    response: Response;
    data: {
        id: number,
        affectedRows: number,
    }
}