import { apiClient } from '@/shared/api';
import type { Result } from '@/shared/lib';

import type { EmployeeModel } from '../model/employee.type';

export type DeleteEmployee = {
    clientId: EmployeeModel['id'],
    response: EmployeeModel['id'],
}

export const deleteEmployee = async (
    employeeId: DeleteEmployee['clientId']
): Promise<Result<DeleteEmployee['response']>> => {
    const url = `http://localhost:80/api/employees/${employeeId}`;

    const response = await apiClient<DeleteEmployee['response']>({ method: 'DELETE', url });

    return response;
};