import { Space, Table } from 'antd';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import type { TableProps } from 'antd';
import { useEffect } from 'react';
import { getClients } from '../clients.service';
import { useAuth } from '../../auth/hooks/useAuth';

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
            <Space>
                <a href=""><EditOutlined /></a>
                <a href=""><DeleteOutlined /></a>
            </Space>
        )
    },
];

export function Clients() {
    const { token } = useAuth();

    console.log(token);

    useEffect(() => {
        const fetch = async () => {
            const response = await getClients(token);

            console.log(response);
        };

        fetch();
    }, [token]);

    const data = [
        {
            key: '1',
            name: 'Guilherme R.',
            age: 29,
            customerService: '02/02/2025',
        },
        {
            key: '2',
            name: 'Lucas',
            age: 28,
            customerService: '04/02/2025',
        },
        {
            key: '3',
            name: 'André',
            age: 32,
            customerService: '08/02/2025',
        },
    ];

    return <Table columns={columns} dataSource={data} />;
}

