import { keepPreviousData, queryOptions } from '@tanstack/react-query';
import { getClients } from '../../../entities/client/api/getClients';

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