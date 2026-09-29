import { Select } from 'antd';

import type { EmployeeModel } from '../../../entities/employee/model/employee.type';
import { useEmployeeTableFilter } from '../model/useEmployeeTableFilter';

type Props = {
    onSelectEmployee: (client?: EmployeeModel) => void,
}

export function EmployeeTableSelect({ onSelectEmployee }: Props) {
    const {
        isFetching,
        options,
        debouncedOnSearch,
        onChange
    } = useEmployeeTableFilter({ onSelectEmployee });

    return (
        <Select
            showSearch
            allowClear
            size='large'
            placeholder='Digite o nome do cliente'
            style={{ width: '400px' }}
            notFoundContent='Nenhum cliente encontrado'
            onSearch={debouncedOnSearch}
            onChange={onChange}
            options={options}
            filterOption={false}
            loading={isFetching}
        />
    );
}