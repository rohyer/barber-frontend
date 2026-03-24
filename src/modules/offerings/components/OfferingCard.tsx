import { ClockCircleOutlined, DollarOutlined } from '@ant-design/icons';
import { Avatar, Card, Flex, Space, Tooltip, Typography } from 'antd';
import type { OfferingModel } from '../offerings.type';

type Props = {
    offering: OfferingModel,
    isPending: boolean,
}

export function OfferingCard({ offering, isPending }: Props) {
    return (
        <Card
            loading={isPending}
            title={offering.name}
            hoverable
        >
            <Flex gap={16} vertical>
                <Space direction='vertical'>
                    <Space>
                        <DollarOutlined />
                        <Typography.Text strong>R$ {offering.value}</Typography.Text>
                    </Space>

                    <Space>
                        <ClockCircleOutlined />
                        <Typography.Text strong>{offering.duration} minutos</Typography.Text>
                    </Space>
                </Space>

                <Space direction='vertical'>
                    <Typography.Text type='secondary'>Colaboradores disponíveis</Typography.Text>

                    <Avatar.Group max={{ count: 3 }}>
                        {offering.employees.map(employee => (
                            <Tooltip title={employee.name} key={employee.id}>
                                <Avatar 
                                    style={{ backgroundColor: '#717171' }} 
                                >
                                    {employee.name.slice(0, 1)}
                                </Avatar>
                            </Tooltip>
                        ))}
                    </Avatar.Group>
                </Space>
            </Flex>
        </Card>
    );
}