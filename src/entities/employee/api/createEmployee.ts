import { apiClient } from '@/shared/api';
import type { Result } from '@/shared/lib';

import type { EmployeeModel } from '../model/employee.type';

type Payload = Pick<EmployeeModel,
    | 'name'
    | 'sex'
    | 'phone'
    | 'address'
    | 'birth'>

export type CreateEmployee = {
    payload: Payload,
    response: EmployeeModel,
}

export const createEmployee = async (
    payload: CreateEmployee['payload']
): Promise<Result<CreateEmployee['response']>> => {
    const url = 'http://localhost:80/api/employees';

    const response = await apiClient<CreateEmployee['response'], CreateEmployee['payload']>(
        { method: 'POST', url, payload }
    );

    return response;
};