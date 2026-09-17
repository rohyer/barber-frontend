import type { EmployeeModel } from '../model/employee.type';
import { apiClient } from '../../../shared/api/apiClient';
import type { Result } from '../../../shared/lib/result';

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