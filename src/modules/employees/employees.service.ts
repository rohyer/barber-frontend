import { apiClient } from '../../shared/services/api.service';
import type { CreateEmployee, DeleteEmployee, GetEmployees, UpdateEmployee } from './employees.contract';

export const getEmployees = async (
    page: number | undefined,
    query: string,
): Promise<GetEmployees['response']> => {
    const url = `http://localhost:80/api/employees?page=${page}query=${query}`;

    const response = await apiClient<GetEmployees['response']>({ method: 'GET', url });

    return response;
};

export const getEmployeeByName = async (
    page: number | undefined,
    query: string,
): Promise<GetEmployees['response']> => {
    const url = `http://localhost:80/api/employees/options?page=${page}&query=${query}`;

    const response = await apiClient<GetEmployees['response']>({ method: 'GET', url });

    return response;
};

export const createEmployee = async (
    payload: CreateEmployee['payload']
): Promise<CreateEmployee['response']> => {
    const url = 'http://localhost:80/api/employees';

    const response = await apiClient<CreateEmployee['response'], CreateEmployee['payload']>(
        { method: 'POST', url, payload }
    );

    return response;
};

export const updateEmployee = async (
    employeeId: UpdateEmployee['clientId'],
    payload: UpdateEmployee['payload'],
): Promise<UpdateEmployee['response']> => {
    const url = `http://localhost:80/api/employees/${employeeId}`;

    const response = await apiClient<UpdateEmployee['response'], UpdateEmployee['payload']>(
        { method: 'PUT', url, payload }
    );

    return response;
};

export const deleteEmployee = async (
    employeeId: DeleteEmployee['clientId']
): Promise<DeleteEmployee['response']> => {
    const url = `http://localhost:80/api/employees/${employeeId}`;

    const response = await apiClient<DeleteEmployee['response']>({ method: 'DELETE', url });

    return response;
};