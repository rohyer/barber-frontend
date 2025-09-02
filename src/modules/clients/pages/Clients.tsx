import { Space, Table } from 'antd';
import type { TableProps } from 'antd';

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
        title: 'Último atendimento',
        dataIndex: 'lastCustomerService',
    },
    {
        title: 'Ações',
        dataIndex: 'actions',
        render: () => (
            <Space>
                <a href="">Editar</a>
                <a href="">Excluir</a>
            </Space>
        )
    },
];

export function Clients() {
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

    return <Table columns={columns} dataSource={data} /> 
}

