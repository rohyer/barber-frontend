import type { Dayjs } from "dayjs"

export type Client = {
    id: number,
    name: string,
    sex: 'M' | 'F' | 'Outro',
    phone: string,
    address: string,
    birth: string,
}

export type ClientFormValues = Omit<Client, 'id' | 'birth'> & {
    birth: Dayjs,
}