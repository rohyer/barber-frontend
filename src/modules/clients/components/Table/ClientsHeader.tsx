import { useQuery } from '@tanstack/react-query';
import { Button, Flex, Select, Spin, Typography } from 'antd';
import { debounce } from 'lodash';
import { useCallback, useMemo, type Dispatch, type SetStateAction } from 'react';
import { Fragment } from 'react/jsx-runtime';
import { searchClientsQueryOptions } from '../../clients.queries';
import { LoadingOutlined } from '@ant-design/icons';

type Props = {
    searchingQuery: string,
    setSearchingQuery: Dispatch<SetStateAction<string>>,
    setSearchQuery: Dispatch<SetStateAction<string>>,
    setCurrentPage: Dispatch<SetStateAction<number>>,
    setIsCreateModalOpen: Dispatch<SetStateAction<boolean>>
};

export function ClientsHeader({
    searchingQuery,
    setSearchingQuery,
    setSearchQuery,
    setCurrentPage,
    setIsCreateModalOpen,
}: Props ) {
    const { data: searchData, isPending } = useQuery(searchClientsQueryOptions(
        { search: searchingQuery }
    ));
    
    const options = searchData?.data.clients
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
        const selectedClient = searchData?.data.clients
            .find(client => client.id === parseInt(value, 10));

        setCurrentPage(1);

        setSearchQuery(selectedClient?.name ?? '');
    };

    return (
        <Fragment>
            <Typography.Title level={2}>Clientes</Typography.Title>

            <Flex justify='space-between' gap='small'>
                <Select
                    showSearch
                    allowClear
                    size='large'
                    placeholder='Digite o nome do cliente'
                    style={{ width: '400px' }}
                    notFoundContent={(
                        isPending
                            ? <Spin indicator={<LoadingOutlined />} />
                            : 'Nenhum cliente encontrado'
                    )}
                    onSearch={debouncedOnSearch}
                    onChange={onChange}
                    options={options}
                    filterOption={false}
                />

                <Button
                    type='primary'
                    size='large'
                    onClick={() => setIsCreateModalOpen(true)}
                >
                    Cadastrar
                </Button>
            </Flex>
        </Fragment>
    );
}