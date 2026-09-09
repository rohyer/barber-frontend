import { Select } from 'antd';
import type { ClientModel } from '../../../entities/client/model/client.type';
import { useClientTableFilter } from '../model/useClientTableFilter';

type Props = {
    onSelectClient: (client?: ClientModel) => void,
}

export function ClientTableSelect({ onSelectClient }: Props) {
    const {
        isFetching,
        options,
        debouncedOnSearch,
        onChange
    } = useClientTableFilter({ onSelectClient });

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