import { apiClient } from '@/shared/api';
import type { Result } from '@/shared/lib';

import type { EmployeeModel } from '../model/employee.type';

type Response = {
    employees: Pick<EmployeeModel, 'id' | 'name'>,
}

export const getEmployeeOptions = async (): Promise<Result<Response>> => {
    const url = 'http://localhost:80/api/employees/options';

    const response = await apiClient<Response>({ method: 'GET', url });

    return response;
};