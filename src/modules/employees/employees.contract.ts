import type { EmployeeModel } from './employees.type';

type EmployeePayload = Pick<EmployeeModel,
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

export type GetEmployees = {
    response: Response<{
        employees: EmployeeModel[],
        total: number,
    }>
}

export type GetEmployeesByName = {
    response: Response<{
        employees: EmployeeModel['name'][],
    }>
}

export type CreateEmployee = {
    payload: EmployeePayload,
    response: Response<EmployeeModel>,
}

export type UpdateEmployee = {
    clientId: EmployeeModel['id'],
    payload: EmployeePayload,
    response: Response<EmployeeModel>,
}

export type DeleteEmployee = {
    clientId: EmployeeModel['id'],
    response: Response<EmployeeModel['id']>,
}