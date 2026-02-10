import { keepPreviousData, queryOptions } from '@tanstack/react-query';
import { getEmployees } from './employees.service';

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

export const searchEmployeesQueryOptions = ({ search }: Omit<Props, 'page'>) => {
    return queryOptions({
        queryKey: ['search-clients', { search }],
        queryFn: () => getEmployees(1, search),
        staleTime: 1000 * 60,
        enabled: !!search,
    });
};