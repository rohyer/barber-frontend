import { keepPreviousData, queryOptions } from '@tanstack/react-query';
import { getOfferings } from './offerings.service';

export const offeringQueryOptions = () => {
    return queryOptions({
        queryKey: ['offerings'],
        queryFn: () => getOfferings(),
        staleTime: 1000 * 60,
        placeholderData: keepPreviousData
    });
};