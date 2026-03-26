import { Flex, Form, Input, InputNumber, Modal, Select, type SelectProps } from 'antd';
import { useCreateOffering } from '../../useOfferings';
import type { OfferingPayload } from '../../offerings.contract';
import { useQuery } from '@tanstack/react-query';
import { employeeQueryOptions } from '../../offerings.queries';

type Props = {
    isOpen: boolean,
    onCancel: () => void,
}

export function CreateOfferingModal({ isOpen, onCancel }: Props) {
    const [form] = Form.useForm();

    const { data, isPending: isSelectPending } = useQuery(employeeQueryOptions());

    const { mutateAsync, isPending } = useCreateOffering({ form, onCancel });

    const options: SelectProps['options'] = data?.data.employees.map(employee => ({
        value: employee.id,
        label: employee.name
    }));

    const handleFinish = async (values: OfferingPayload) => {
        await mutateAsync(values);
    };

    return (
        <Modal
            title='Cadastrar serviço'
            open={isOpen}
            okText="Cadastrar"
            onOk={() => form.submit()}
            okButtonProps={{ loading: isPending }}
            cancelText="Voltar"
            onCancel={onCancel}
            cancelButtonProps={{ disabled: isPending }}
            destroyOnHidden
        >
            <Form
                form={form}
                id="createOfferingForm"
                layout='vertical'
                onFinish={handleFinish}
            >
                <Form.Item
                    name='name'
                    label='Nome'
                    rules={[{ required: true, message: 'Preencha o campo nome' }]}
                >
                    <Input />
                </Form.Item>

                <Flex justify='space-between' gap='small'>
                    <Form.Item
                        name='value'
                        label='Valor'
                        rules={[{ required: true, message: 'Preencha o campo valor' }]}
                        style={{ width: '50%' }}
                    >
                        <InputNumber controls={false} style={{ width: '100%' }} />
                    </Form.Item>

                    <Form.Item
                        name='duration'
                        label='Duração'
                        rules={[{ required: true, message: 'Preencha o campo duração' }]}
                        style={{ width: '50%' }}
                    >
                        <InputNumber controls={false} style={{ width: '100%' }} />
                    </Form.Item>
                </Flex>

                <Form.Item
                    name='employees'
                    label='Colaboradores'
                    style={{ width: '100%' }}
                >
                    <Select
                        mode='multiple'
                        options={options}
                        loading={isSelectPending}
                        allowClear
                    />
                </Form.Item>
                
            </Form>
        </Modal>
    );
}