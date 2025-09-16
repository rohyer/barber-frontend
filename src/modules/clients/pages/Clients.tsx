import { Button, Empty, Flex, Select, Space, Table, theme, Tooltip, Typography } from 'antd';
import { DeleteFilled, EditFilled } from '@ant-design/icons';
import type { TablePaginationConfig, TableProps } from 'antd';
import { Fragment, useEffect, useState } from 'react';
import { getClients } from '../clients.service';
import type { Client } from '../clients.type';
import { calculateAge } from '../clients.helper';
import { CreateClientModal } from '../components/Modals/CreateClientModal';
import { DeleteClientModal } from '../components/Modals/DeleteClientModal';
import { UpdateClientModal } from '../components/Modals/UpdateClientModal';
import { notify } from '../../../shared/utils/notify';

export function Clients() {
    const { token } = theme.useToken();

    const [isLoading, setIsLoading] = useState(false);

    const [clients, setClients] = useState<Client[]>([]);
    const [totalClients, setTotalClients] = useState(0);

    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    
    const [updateClientModal, setUpdateClientModal] = useState<Client | null>(null);
    const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
    
    const [deleteClientModal, setDeleteClientModal] = useState<Client | null>(null);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

    useEffect(() => {
        const fetch = async () => {
            try {
                setIsLoading(true);

                const response = await getClients(0);

                setClients(response.data.clients);
                setTotalClients(response.data.total);
            } catch(error) {
                notify({
                    message: 'Erro ao listar clientes',
                    type: 'error'
                });
            } finally {
                setIsLoading(false);
            }
        };

        fetch();
    }, []);

    const handleChange = async (pagination: TablePaginationConfig) => {        
        try {
            setIsLoading(true);

            if (pagination.current === undefined)
                throw new Error('Erro ao atualizar lista de cliente');

            const calculateOffset = (pagination.current - 1) * 10;

            const response = await getClients(calculateOffset);

            setClients(response.data.clients);
            setTotalClients(response.data.total);
        } catch(error) {
            notify({
                message: 'Erro ao listar clientes',
                description: error instanceof Error ? error.message : 'Erros desconhecido',
                type: 'error'
            });
        } finally {
            setIsLoading(false);
        }
    };

    const dataSource = clients && clients.map(client => ({
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
                        size='large'
                        placeholder='Digite o nome do cliente'
                        style={{ width: '300px' }}
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
                    loading={isLoading}
                    locale={{ emptyText: <Empty description="Nenhum cliente encontrado" /> }}
                    sortDirections={['ascend']}
                    onChange={handleChange}
                    scroll={{ x: '500' }}
                    pagination={{
                        total: totalClients,
                        showTotal(total, range) {
                            return `Total de clientes: ${total}`;
                        },
                    }}
                />
            </Space>

            <CreateClientModal
                setClients={setClients}
                isOpen={isCreateModalOpen}
                onCancel={() => setIsCreateModalOpen(false)}
            />

            { updateClientModal ?
                <UpdateClientModal
                    updateClientModal={updateClientModal}
                    setUpdateClientModal={setUpdateClientModal}
                    isOpen={isUpdateModalOpen}
                    setClients={setClients}
                    setIsUpdateModalOpen={setIsUpdateModalOpen}
                /> : null
            }

            { deleteClientModal ?
                <DeleteClientModal
                    deleteClientModal={deleteClientModal}
                    setDeleteClientModal={setDeleteClientModal}
                    isOpen={isDeleteModalOpen}
                    setClients={setClients}
                    setIsDeleteModalOpen={setIsDeleteModalOpen}
                /> : null
            }
        </Fragment>
    );
}

