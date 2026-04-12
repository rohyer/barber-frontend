import type { Employee, OfferingFormValues, OfferingModel } from './offerings.type';

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
        employees: Employee[]
    }>
}

export type CreateOffering = {
    payload: OfferingFormValues,
    response: Response<OfferingModel>,
}

export type DeleteOffering = {
    offeringId: OfferingModel['id'],
    response: Response<OfferingModel['id']>
}

export type UpdateOffering = {
    offeringId: OfferingModel['id'],
    payload: OfferingFormValues,
    response: Response<OfferingModel>,
}