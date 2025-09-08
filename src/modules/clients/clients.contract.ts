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
    data: {
        userId: number,
    }
}

export type CreateClient = {
    body: Body,
    response: Response,

}