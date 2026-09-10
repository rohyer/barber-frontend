export type ClientModel = {
    id: number,
    name: string,
    sex: 'M' | 'F' | 'Outro',
    phone: string,
    address: string,
    birth: string,
    lastCustomerServiceDate: string | null,
    createdAt: string,
}

export type ClientStatus = 'new' | 'active' | 'ausent';