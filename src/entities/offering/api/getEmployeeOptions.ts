import { apiClient } from '../../../shared/api/apiClient';
import type { Result } from '../../../shared/lib/result';
import type { Employee } from '../model/offering.type';

export type Response = {
    employees: Employee[],
}

export const getEmployeeOptions = async (): Promise<Result<Response>> => {
    const url = 'http://localhost:80/api/employees/options';

    const response = await apiClient<Response>({ method: 'GET', url });

    return response;
};