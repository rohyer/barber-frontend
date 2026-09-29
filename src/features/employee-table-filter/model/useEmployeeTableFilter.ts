import { useQuery } from '@tanstack/react-query';
import { debounce } from 'lodash';
import { useCallback, useMemo, useState } from 'react';

import { getEmployees } from '../../../entities/employee/api/getEmployees';
import type { EmployeeModel } from '../../../entities/employee/model/employee.type';

type Params = {
    onSelectEmployee: (client?: EmployeeModel) => void
}

export const useEmployeeTableFilter = ({ onSelectEmployee }: Params) => {
    const [searchingQuery, setSearchingQuery] = useState('');

    const { data, isFetching } = useQuery({
        queryKey: ['search-employees', { searchingQuery }],
        queryFn: () => getEmployees(1, searchingQuery),
        staleTime: 1000 * 60,
        enabled: !!searchingQuery,
    });

    const options = data?.data?.employees
        .map(employee => ({ label: employee.name, value: employee.id })) ?? [];
    
    const onSearch = useCallback(async (value: string) => {
        if (value === '') {
            setSearchingQuery('');
            return;
        }
    
        setSearchingQuery(value);
    }, [setSearchingQuery]);
    
    const debouncedOnSearch = useMemo(() => debounce(onSearch, 500), [onSearch]);
    
    const onChange = (value: string) => {
        const selectedClient = data?.data?.employees
            .find(employee => employee.id === parseInt(value, 10));
            
        onSelectEmployee(selectedClient);
    };
    
    return {
        isFetching,
        options,
        debouncedOnSearch,
        onChange
    };

};