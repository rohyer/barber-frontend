import { ClockCircleOutlined, DeleteFilled, DollarOutlined, EditFilled } from '@ant-design/icons';
import { Avatar, Button, Card, Flex, Space, theme, Tooltip, Typography } from 'antd';
import type { OfferingModel } from '../offerings.type';

type Props = {
    offering: OfferingModel,
    isPending: boolean,
}

export function OfferingCard({ offering, isPending }: Props) {
    const { token } = theme.useToken();

    return (
        <Card
            loading={isPending}
            actions={[
                <Button type='text' shape='circle'><EditFilled style={{ color: token.colorPrimary }} /></Button>,
                <Button type='text' shape='circle' danger><DeleteFilled /></Button>
            ]}
        >
            <Flex gap={8} vertical>
                <Typography.Title level={5}>{offering.name}</Typography.Title>

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
                    <Typography.Text type='secondary'>Profissionais disponíveis</Typography.Text>

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