import { keepPreviousData, queryOptions } from '@tanstack/react-query';

import { getEmployeeOptions } from '@/entities/offering';

export const employeeQueryOptions = () => {
    return queryOptions({
        queryKey: ['employeesOptions'],
        queryFn: () => getEmployeeOptions(),
        staleTime: 1000 * 60,
        placeholderData: keepPreviousData,
    });
};