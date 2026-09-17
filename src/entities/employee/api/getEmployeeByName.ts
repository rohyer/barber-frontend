import type { EmployeeModel } from '../model/employee.type';
import { apiClient } from '../../../shared/api/apiClient';
import type { Result } from '../../../shared/lib/result';

type Response = {
    employees: EmployeeModel[],
    total: number,
}

export type GetEmployees = {
    response: Response,
}

export const getEmployeeByName = async (
    page: number | undefined,
    query: string,
): Promise<Result<GetEmployees['response']>> => {
    const url = `http://localhost:80/api/employees/options?page=${page}&query=${query}`;

    const response = await apiClient<GetEmployees['response']>({ method: 'GET', url });

    return response;
};