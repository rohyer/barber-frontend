import { Flex, Form, Input, InputNumber, Modal, Select, Spin, type SelectProps } from 'antd';
import { useCreateOffering } from '../../useOfferings';
import type { OfferingPayload } from '../../offerings.contract';
import { useQuery } from '@tanstack/react-query';
import { employeeQueryOptions } from '../../offerings.queries';

type Props = {
    isOpen: boolean,
    onCancel: () => void,
}

const RULES = [{ required: true, message: 'Campo de preenchimento obrigatório' }];

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
                    rules={RULES}
                >
                    <Input />
                </Form.Item>

                <Flex justify='space-between' gap='small'>
                    <Form.Item
                        name='value'
                        label='Valor'
                        rules={RULES}
                        style={{ width: '50%' }}
                    >
                        <InputNumber controls={false} style={{ width: '100%' }} />
                    </Form.Item>

                    <Form.Item
                        name='duration'
                        label='Duração'
                        rules={RULES}
                        style={{ width: '50%' }}
                    >
                        <InputNumber controls={false} style={{ width: '100%' }} />
                    </Form.Item>
                </Flex>

                <Form.Item
                    name='idEmployees'
                    label='Colaboradores'
                    rules={RULES}
                    style={{ width: '100%' }}
                >
                    <Select
                        mode='multiple'
                        options={options}
                        loading={isSelectPending}
                        notFoundContent={isSelectPending ? <Spin /> : null}
                        allowClear
                    />
                </Form.Item>
            </Form>
        </Modal>
    );
}