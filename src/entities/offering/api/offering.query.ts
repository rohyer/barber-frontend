import { keepPreviousData, queryOptions } from '@tanstack/react-query';

import { getEmployeeOptions } from '@/entities/employee/@x/offering.service';

import { getOfferings } from '../api/getOfferings';

export const offeringQueryOptions = () => {
    return queryOptions({
        queryKey: ['offerings'],
        queryFn: () => getOfferings(),
        staleTime: 1000 * 60,
        placeholderData: keepPreviousData
    });
};

export const employeeQueryOptions = () => {
    return queryOptions({
        queryKey: ['employeesOptions'],
        queryFn: () => getEmployeeOptions(),
        staleTime: 1000 * 60,
        placeholderData: keepPreviousData,
    });
};