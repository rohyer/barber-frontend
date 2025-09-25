import { Button, Empty, Flex, Select, Space, Table, theme, Tooltip, Typography } from 'antd';
import { DeleteFilled, EditFilled } from '@ant-design/icons';
import type { TablePaginationConfig, TableProps } from 'antd';
import { Fragment, useMemo, useState } from 'react';
import { getClients } from '../clients.service';
import type { Client } from '../clients.type';
import { calculateAge } from '../clients.helper';
import { CreateClientModal } from '../components/Modals/CreateClientModal';
import { DeleteClientModal } from '../components/Modals/DeleteClientModal';
import { UpdateClientModal } from '../components/Modals/UpdateClientModal';
import { notify } from '../../../shared/utils/notify';
import { debounce } from 'lodash';
import { useQuery } from '@tanstack/react-query';
import { clientsQueryOptions, searchClientsQueryOptions } from '../clients.queries';

export function Clients() {
    const [currentPage, setCurrentPage] = useState(1);
    const [searchQuery, setSearchQuery] = useState('');
    const [searchingQuery, setSearchingQuery] = useState('');

    const { token } = theme.useToken();

    const { data, error, isPending } = useQuery(clientsQueryOptions(
        { page: (currentPage - 1) * 10, search: searchQuery }
    ));

    const { data: searchData, refetch } = useQuery(searchClientsQueryOptions(
        { search: searchingQuery }
    ));

    const [options, setOptions] = useState<{label: string, value: string}[]>([]);

    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    
    const [updateClientModal, setUpdateClientModal] = useState<Client | null>(null);
    const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
    
    const [deleteClientModal, setDeleteClientModal] = useState<Client | null>(null);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

    const handleChange = (pagination: TablePaginationConfig) => {        
        if (pagination.current === undefined)
            return;

        setCurrentPage(pagination.current);
    };

    const onSearch = async (value: string) => {
        setOptions([]);

        if (value === '')
            return;

        setSearchingQuery(value);

        const result = await refetch();        

        setOptions(result?.data?.data.clients.map(client => ({ label: client.name, value: client.name })) ?? []);
    };

    const debouncedOnSearch = useMemo(() => debounce(onSearch, 500), []);

    const onSelectChange = (value: string) => {
        setCurrentPage(1);
        setSearchQuery(value ?? '');

        setOptions(data?.data.clients.map(client => ({ label: client.name, value: client.name })) ?? []);
    };

    const dataSource = data?.data.clients && data?.data.clients.map(client => ({
        key: client.id,
        name: client.name,
        sex: client.sex,
        age: calculateAge(client.birth),
        phone: client.phone,
        actions: (
            <Space size='middle'>
                <Tooltip title="Editar">
                    <Button
                        shape='circle'
                        type='text'
                        onClick={() => {
                            setIsUpdateModalOpen(true);
                            setUpdateClientModal(client);
                        }}
                    >
                        <EditFilled
                            style={{ color: token.colorPrimary }}
                        />
                    </Button>
                </Tooltip>

                <Tooltip title="Deletar">
                    <Button 
                        shape='circle'
                        type='text'
                        onClick={() => {
                            setIsDeleteModalOpen(true);
                            setDeleteClientModal(client);
                        }}
                    >
                        <DeleteFilled style={{ color: token.colorError }} />
                    </Button>
                </Tooltip>
            </Space>
        ),
    }));

    const columns: TableProps['columns'] = [
        {
            title: 'Nome',
            dataIndex: 'name',
        },
        {
            title: 'Sexo',
            dataIndex: 'sex',
        },
        {
            title: 'Idade',
            dataIndex: 'age',
        },
        {
            title: 'Telefone',
            dataIndex: 'phone',
        },
        {
            title: 'Ações',
            dataIndex: 'actions',
        },
    ];

    return (
        <Fragment>
            <Space direction='vertical' style={{ width: '100%' }}>
                <Typography.Title level={2}>Clientes</Typography.Title>

                <Flex justify='space-between' gap={token.margin}>
                    <Select
                        showSearch
                        allowClear
                        size='large'
                        placeholder='Digite o nome do cliente'
                        style={{ width: '300px' }}
                        notFoundContent="Nenhum cliente encontrado"
                        // loading={isLoading}
                        onSearch={debouncedOnSearch}
                        onChange={onSelectChange}
                        options={options}
                    />

                    <Button
                        type='primary'
                        size='large'
                        onClick={() => setIsCreateModalOpen(true)}
                    >
                        Cadastrar
                    </Button>
                </Flex>

                <Table
                    size='middle'
                    columns={columns}
                    dataSource={dataSource}
                    loading={isPending}
                    locale={{ emptyText: <Empty description="Nenhum cliente encontrado" /> }}
                    sortDirections={['ascend']}
                    onChange={(pagination) => {
                        handleChange(pagination);
                        setCurrentPage(pagination.current ?? 1);
                    }}
                    scroll={{ x: '500' }}
                    pagination={{
                        total: data?.data.total,
                        current: currentPage,
                        showTotal(total) {
                            return `Total de clientes: ${total}`;
                        },
                    }}
                />
            </Space>

            { isCreateModalOpen &&
                <CreateClientModal
                    isOpen={isCreateModalOpen}
                    onCancel={() => setIsCreateModalOpen(false)}
                />
            }

            { isUpdateModalOpen && updateClientModal &&
                <UpdateClientModal
                    updateClientModal={updateClientModal}
                    setUpdateClientModal={setUpdateClientModal}
                    isOpen={isUpdateModalOpen}
                    setIsUpdateModalOpen={setIsUpdateModalOpen}
                />
            }

            {/*
            { isDeleteModalOpen && deleteClientModal &&
                <DeleteClientModal
                    deleteClientModal={deleteClientModal}
                    setDeleteClientModal={setDeleteClientModal}
                    isOpen={isDeleteModalOpen}
                    // setClients={setClients}
                    setIsDeleteModalOpen={setIsDeleteModalOpen}
                />
            } */}
        </Fragment>
    );
}

