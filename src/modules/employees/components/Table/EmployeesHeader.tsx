import { useQuery } from '@tanstack/react-query';
import { Button, Flex, Select, Typography } from 'antd';
import { debounce } from 'lodash';
import { useCallback, useMemo, type Dispatch, type SetStateAction } from 'react';
import { Fragment } from 'react/jsx-runtime';
import { searchEmployeesQueryOptions } from '../../employees.queries';

type Props = {
    searchingQuery: string,
    setSearchingQuery: Dispatch<SetStateAction<string>>,
    setSearchQuery: Dispatch<SetStateAction<string>>,
    setCurrentPage: Dispatch<SetStateAction<number>>,
    setIsCreateModalOpen: Dispatch<SetStateAction<boolean>>
};

export function EmployeesHeader({
    searchingQuery,
    setSearchingQuery,
    setSearchQuery,
    setCurrentPage,
    setIsCreateModalOpen,
}: Props ) {
    const { data: searchData, isFetching } = useQuery(searchEmployeesQueryOptions(
        { search: searchingQuery }
    ));
    
    const options = searchData?.data.employees
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
        const selectedEmployee = searchData?.data.employees
            .find(employee => employee.id === parseInt(value, 10));

        setCurrentPage(1);

        setSearchQuery(selectedEmployee?.name ?? '');
    };

    return (
        <Fragment>
            <Typography.Title level={2}>Colaboradores</Typography.Title>

            <Flex justify='space-between' gap='small'>
                <Select
                    showSearch
                    allowClear
                    size='large'
                    placeholder='Digite o nome do colaborador'
                    style={{ width: '400px' }}
                    notFoundContent='Nenhum colaborador encontrado'
                    onSearch={debouncedOnSearch}
                    onChange={onChange}
                    options={options}
                    filterOption={false}
                    loading={isFetching}
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