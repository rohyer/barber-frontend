import { useQuery } from '@tanstack/react-query';
import type { TablePaginationConfig, TableProps } from 'antd';
import { Empty, Table } from 'antd';
import type { Dispatch, SetStateAction } from 'react';

import type { ClientModel } from '@/entities/client';
import { calculateAge } from '@/shared/lib';
import { applyMask, getRightMask } from '@/shared/lib';

import { clientsQueryOptions } from '../model/clients.queries';
import { ClientsActions } from './ClientsActions';
import { ClientsStatus } from './ClientsStatus';

type Props = {
    searchQuery: string,
    currentPage: number,
    setCurrentPage: Dispatch<SetStateAction<number>>,
    setIsUpdateModalOpen: Dispatch<SetStateAction<boolean>>,
    setUpdateClientModal: Dispatch<SetStateAction<ClientModel | null>>,
    setIsDeleteModalOpen: Dispatch<SetStateAction<boolean>>,
    setDeleteClientModal: Dispatch<SetStateAction<ClientModel | null>>,
};

export function ClientsTable({
    searchQuery,
    currentPage,
    setCurrentPage,
    setIsUpdateModalOpen,
    setUpdateClientModal,
    setIsDeleteModalOpen,
    setDeleteClientModal,
}: Props) {
    const { data, isPending } = useQuery(clientsQueryOptions(
        { page: currentPage, search: searchQuery }
    ));

    const handleChange = (pagination: TablePaginationConfig) => {        
        if (pagination.current === undefined)
            return;

        setCurrentPage(pagination.current);
    };

    const dataSource = data?.data?.clients && data?.data.clients.map(client => ({
        key: client.id,
        status: (
            <ClientsStatus
                lastCustomerServiceDate={client.lastCustomerServiceDate}
                createdAt={client.createdAt}
            />
        ),
        name: client.name,
        sex: client.sex,
        age: calculateAge(client.birth),
        phone: applyMask(client.phone, getRightMask(client.phone)),
        actions: (
            <ClientsActions
                client={client}
                setIsUpdateModalOpen={setIsUpdateModalOpen}
                setUpdateClientModal={setUpdateClientModal}
                setIsDeleteModalOpen={setIsDeleteModalOpen}
                setDeleteClientModal={setDeleteClientModal}
            />
        ),
    }));

    const columns: TableProps['columns'] = [
        {
            title: 'Nome',
            dataIndex: 'name',
            minWidth: 250,
        },
        {
            title: 'Status',
            dataIndex: 'status',
            minWidth: 150,
        },
        {
            title: 'Sexo',
            dataIndex: 'sex',
            width: 125,
        },
        {
            title: 'Idade',
            dataIndex: 'age',
            width: 125,
        },
        {
            title: 'Telefone',
            dataIndex: 'phone',
            width: 150,
            minWidth: 150,
        },
        {
            title: 'Ações',
            dataIndex: 'actions',
            width: 125
        },
    ];

    return (
        <Table
            tableLayout='auto'
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
                total: data?.data?.total,
                current: currentPage,
                showTotal(total) {
                    return `Total de clientes: ${total}`;
                },
            }}
        />
    );
}