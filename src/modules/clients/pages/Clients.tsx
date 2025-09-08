import { Button, Flex, Space, Table, theme, Tooltip, Typography } from 'antd';
import { DeleteFilled, EditFilled } from '@ant-design/icons';
import type { TableProps } from 'antd';
import { Fragment, useEffect, useState } from 'react';
import { getClients } from '../clients.service';
import type { Clients } from '../clients.type';
import { calculateAge } from '../clients.helper';
import { CreateClientModal } from '../components/CreateModal/CreateClientModal';

export function Clients() {
    const { token } = theme.useToken();

    const [isLoading, setIsLoading] = useState(false);

    const [error, setError] = useState<string | null>(null);

    const [clients, setClients] = useState<Clients[]>([]);

    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

    useEffect(() => {
        const fetch = async () => {
            try {
                setIsLoading(true);
                setError(null);

                const response = await getClients();

                setClients(response.data);
            } catch(error) {
                setError(error instanceof Error ? error.message : 'Erro desconhecido');
            } finally {
                setIsLoading(false);
            }
        };

        fetch();
    }, []);

    const dataSource = clients && clients.map(client => ({
        key: client.id,
        name: client.name,
        sex: client.sex,
        age: calculateAge(client.birth),
        phone: client.phone
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
            title: 'Último atendimento',
            dataIndex: 'lastCustomerService',
        },
        {
            title: 'Ações',
            dataIndex: 'actions',
            render: () => (
                <Space size='middle'>
                    <Tooltip title="Editar">
                        <Button
                            shape='circle'
                            type='text'
                        >
                            <EditFilled style={{ color: token.colorPrimary }} />
                        </Button>
                    </Tooltip>

                    <Tooltip title="Deletar">
                        <Button 
                            shape='circle'
                            type='text'
                        >
                            <DeleteFilled style={{ color: token.colorError }} />
                        </Button>
                    </Tooltip>
                </Space>
            )
        },
    ];

    return (
        <Fragment>
            <Flex justify='space-between' gap={token.margin}>
                <Typography.Title level={2}>Clientes</Typography.Title>

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
            />

            <CreateClientModal
                isOpen={isCreateModalOpen}
                onCancel={() => setIsCreateModalOpen(false)}
            />
        </Fragment>
    );
}

