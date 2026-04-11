import { Flex, Form, Input, InputNumber, Modal, Select, Spin, type SelectProps } from 'antd';
import { useQuery } from '@tanstack/react-query';
import { employeeQueryOptions } from '../../offerings.queries';
import type { OfferingModel } from '../../offerings.type';
import { useOfferingMutations } from '../../useOfferings';

type Props = {
    isOpen: boolean,
    updateOfferingSelected: OfferingModel,
    setUpdateOfferingSelected: React.Dispatch<React.SetStateAction<OfferingModel | null>>
    setIsUpdateModalOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const RULES = [{ required: true, message: 'Campo de preenchimento obrigatório' }];

export function UpdateOfferingModal({
    isOpen,
    updateOfferingSelected,
    setUpdateOfferingSelected,
    setIsUpdateModalOpen,
}: Props) {
    const [form] = Form.useForm();

    const handleCancel = () => {
        setIsUpdateModalOpen(false);
        setUpdateOfferingSelected(null);
    };

    const { data, isPending: isSelectPending } = useQuery(employeeQueryOptions());

    const { mutateUpdate, isUpdatePending } = useOfferingMutations();

    const options: SelectProps['options'] = data?.data.employees.map(employee => ({
        value: employee.id,
        label: employee.name
    }));

    return (
        <Modal
            title='Editar serviço'
            open={isOpen}
            okText="Editar"
            onOk={() => form.submit()}
            okButtonProps={{ loading: isUpdatePending }}
            cancelText="Voltar"
            onCancel={handleCancel}
            cancelButtonProps={{ disabled: isUpdatePending }}
            destroyOnHidden
        >
            <Form
                form={form}
                id="updateOfferingForm"
                layout='vertical'
                initialValues={{ ...updateOfferingSelected }}
                onFinish={(values) => mutateUpdate(values)}
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