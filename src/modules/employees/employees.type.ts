import type { Dayjs } from 'dayjs';

export type EmployeeModel = {
    id: number,
    name: string,
    address: string,
    sex: 'M' | 'F' | 'Outro',
    phone: string,
    birth: string,
    totalAppointments: number,
    createdAt: string,
};

export type EmployeeFormValues = Pick<EmployeeModel,
    | 'name'
    | 'sex'
    | 'phone'
    | 'address'
> & { birth: Dayjs }
