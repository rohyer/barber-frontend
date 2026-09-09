import { useQuery } from '@tanstack/react-query';
import { getClients } from '../../../modules/clients/clients.service';
import { useCallback, useMemo, useState } from 'react';
import { debounce } from 'lodash';
import type { ClientModel } from '../../../entities/client/model/client.type';

type Params = {
    onSelectClient: (client?: ClientModel) => void
}

export const useClientTableFilter = ({ onSelectClient }: Params) => {
    const [searchingQuery, setSearchingQuery] = useState('');

    const { data, isFetching } = useQuery({
        queryKey: ['search-clients', { searchingQuery }],
        queryFn: () => getClients(1, searchingQuery),
        staleTime: 1000 * 60,
        enabled: !!searchingQuery,
    });

    const options = data?.data.clients
        .map(client => ({ label: client.name, value: client.id })) ?? [];

    const onSearch = useCallback(async (value: string) => {
        if (value === '') {
            setSearchingQuery('');
            return;
        }

        setSearchingQuery(value);
    }, [setSearchingQuery]);

    const debouncedOnSearch = useMemo(() => debounce(onSearch, 500), [onSearch]);

    const onChange = (value: string) => {
        const selectedClient = data?.data.clients
            .find(client => client.id === parseInt(value, 10));
        
        onSelectClient(selectedClient);
    };

    return {
        isFetching,
        options,
        debouncedOnSearch,
        onChange
    };
};