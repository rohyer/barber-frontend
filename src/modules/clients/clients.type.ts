import type { TagProps } from 'antd';
import type { Dayjs } from 'dayjs';

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

export type Clients = Pick<ClientModel,
    | 'id'
    | 'name'
    | 'sex'
    | 'phone'
    | 'address'
    | 'birth'
>

export type ClientFormValues = Pick<ClientModel,
    | 'name'
    | 'sex'
    | 'phone'
    | 'address'
> & { birth: Dayjs }

export type GetClientStatusValues = {
    title: string,
    color: TagProps['color'],
    status: 'Novo' | 'Ativo' | 'Ausente',
}