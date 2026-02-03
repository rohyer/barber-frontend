import { type Dispatch, type SetStateAction } from 'react';
import { Empty, Space, Table, type TablePaginationConfig, type TableProps } from 'antd';
import type { ClientModel } from '../../clients.type';
import { clientsQueryOptions } from '../../clients.queries';
import { useQuery } from '@tanstack/react-query';
import { calculateAge } from '../../clients.helper';
import { ClientsActions } from './ClientsActions.';
import { ClientsStatus } from './ClientsStatus';
import { WhatsAppOutlined } from '@ant-design/icons';
import { applyMask, getRightMask } from '../../../../shared/utils/mask';

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

    const dataSource = data?.data.clients && data?.data.clients.map(client => ({
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
            minWidth: 300,
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
            width: 150
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