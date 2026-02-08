import { keepPreviousData, queryOptions } from '@tanstack/react-query';
import { getClients } from './clients.service';

type Props = {
    page: number,
    search: string,
}

export const clientsQueryOptions = ({ page, search }: Props) => {
    return queryOptions({
        queryKey: ['clients', { page, search }],
        queryFn: () => getClients(page, search),
        staleTime: 1000 * 60,
        placeholderData: keepPreviousData,
    });
};

export const searchClientsQueryOptions = ({ search }: Omit<Props, 'page'>) => {
    return queryOptions({
        queryKey: ['search-clients', { search }],
        queryFn: () => getClients(1, search),
        staleTime: 1000 * 60,
        enabled: !!search,
    });
};