import type { OfferingFormValues, OfferingModel } from './offerings.type';

export type OfferingPayload = OfferingFormValues;

type EmployeeOptions = {
    id: number,
    name: string,
}

type Response<T> = {
    success: boolean,
    message: string,
    fromCache: boolean,
    data: T,
}

export type GetOfferings = {
    response: Response<{
        offerings: OfferingModel[],
    }>
}

export type GetEmployeeOptions = {
    response: Response<{
        employees: EmployeeOptions[]
    }>
}

export type CreateOffering = {
    payload: OfferingPayload,
    response: Response<OfferingModel>,
}

export type DeleteOffering = {
    offeringId: OfferingModel['id'],
    response: Response<OfferingModel['id']>
}

export type UpdateOffering = {
    offeringId: OfferingModel['id'],
    payload: OfferingPayload,
    response: Response<OfferingModel>,
}