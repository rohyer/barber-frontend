import { type Dispatch, type SetStateAction } from 'react';
import { Empty, Table, type TablePaginationConfig, type TableProps } from 'antd';
import type { Client } from '../clients.type';
import { clientsQueryOptions } from '../clients.queries';
import { useQuery } from '@tanstack/react-query';
import { calculateAge } from '../clients.helper';
import { ClientsActions } from './ClientsActions.';

type Props = {
    searchQuery: string,
    currentPage: number,
    setCurrentPage: Dispatch<SetStateAction<number>>,
    setIsUpdateModalOpen: Dispatch<SetStateAction<boolean>>
    setUpdateClientModal: Dispatch<SetStateAction<Client | null>>
    setIsDeleteModalOpen: Dispatch<SetStateAction<boolean>>
    setDeleteClientModal: Dispatch<SetStateAction<Client | null>>
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

    const dataSource = data?.data.clients && data?.data.clients.map(client => ({
        key: client.id,
        name: client.name,
        sex: client.sex,
        age: calculateAge(client.birth),
        phone: client.phone,
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
            minWidth: 300,
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
            width: 125
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
                total: data?.data.total,
                current: currentPage,
                showTotal(total) {
                    return `Total de clientes: ${total}`;
                },
            }}
        />
    );
}