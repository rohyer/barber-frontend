import { keepPreviousData, queryOptions } from '@tanstack/react-query';

import { getEmployees } from '../../../entities/employee/api/getEmployees';

type Props = {
    page: number,
    search: string,
}

export const employeesQueryOptions = ({ page, search }: Props) => {
    return queryOptions({
        queryKey: ['employees', { page, search }],
        queryFn: () => getEmployees(page, search),
        staleTime: 1000 * 60,
        placeholderData: keepPreviousData,
    });
};