import type { OfferingModel } from './offerings.type';

export type OfferingPayload = Pick<OfferingModel, 'name' | 'value' | 'duration'>;

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

export type CreateOffering = {
    payload: OfferingPayload,
    response: Response<OfferingModel>,
}