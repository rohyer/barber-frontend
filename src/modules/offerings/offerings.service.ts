import { apiClient } from '../../shared/services/api.service';
import type { CreateOffering, DeleteOffering, GetEmployeeOptions, GetOfferings, UpdateOffering } from './offerings.contract';

export const getOfferings = async (): Promise<GetOfferings['response']> => {
    const url = 'http://localhost:80/api/offerings';

    const response = await apiClient<GetOfferings['response']>({ method: 'GET', url });

    return response;
};

export const getEmployeeOptions = async (): Promise<GetEmployeeOptions['response']> => {
    const url = 'http://localhost:80/api/employees/options';

    const response = await apiClient<GetEmployeeOptions['response']>({ method: 'GET', url });

    return response;
};

export const createOffering = async (
    payload: CreateOffering['payload']
): Promise<CreateOffering['response']> => {
    const url = 'http://localhost:80/api/offerings';

    const response = await apiClient<CreateOffering['response'], CreateOffering['payload']>({ method: 'POST', url, payload });

    return response;
};

export const deleteOffering = async (
    offeringId: DeleteOffering['offeringId']
): Promise<DeleteOffering['response']> => {
    const url = `http://localhost:80/api/offerings/${offeringId}`;

    const response = await apiClient<DeleteOffering['response']>({ method: 'DELETE', url });

    return response;
};

export const updateOffering = async (
    offeringId: UpdateOffering['offeringId'],
    payload: UpdateOffering['payload']
): Promise<UpdateOffering['response']> => {
    const url = `http://localhost:80/api/offerings/${offeringId}`;

    const response = await apiClient<UpdateOffering['response'], UpdateOffering['payload']>({ method: 'PUT', url, payload });

    return response;
};