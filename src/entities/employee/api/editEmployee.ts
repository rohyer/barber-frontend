import type { EmployeeModel } from '../model/employee.type';
import { apiClient } from '../../../shared/api/apiClient';
import type { Result } from '../../../shared/lib/result';

type EmployeePayload = Pick<EmployeeModel,
    | 'name'
    | 'sex'
    | 'phone'
    | 'address'
    | 'birth'>

export type UpdateEmployee = {
    clientId: EmployeeModel['id'],
    payload: EmployeePayload,
    response: EmployeeModel,
}

export const updateEmployee = async (
    employeeId: UpdateEmployee['clientId'],
    payload: UpdateEmployee['payload'],
): Promise<Result<UpdateEmployee['response']>> => {
    const url = `http://localhost:80/api/employees/${employeeId}`;

    const response = await apiClient<UpdateEmployee['response'], UpdateEmployee['payload']>(
        { method: 'PUT', url, payload }
    );

    return response;
};