import { Flex, Form, Input, InputNumber, Modal, Select, Spin, type SelectProps } from 'antd';
import { useOfferingMutations } from '../../hooks/useOfferings';
import { useQuery } from '@tanstack/react-query';
import { employeeQueryOptions } from '../../offerings.queries';
import type { OfferingFormValues } from '../../offerings.type';
import { OFFERING_FORM_NAMES } from '../../offerings.constant';

type Props = {
    isOpen: boolean,
    onCancel: () => void,
}

const RULES = [{ required: true, message: 'Campo de preenchimento obrigatório' }];

export function CreateOfferingModal({ isOpen, onCancel }: Props) {
    const [form] = Form.useForm<OfferingFormValues>();    

    const { data, isPending: isSelectPending } = useQuery(employeeQueryOptions());

    const { mutateCreate, isCreatePending } = useOfferingMutations();

    const options: SelectProps['options'] = data?.data.employees.map(employee => ({
        value: employee.id,
        label: employee.name,
    }));

    const handleFinish = async (values: OfferingFormValues) => {
        mutateCreate(values, {
            onSuccess: () => {
                form.resetFields();
                onCancel();
            }
        });
    };

    return (
        <Modal
            title='Cadastrar serviço'
            open={isOpen}
            okText="Cadastrar"
            onOk={() => form.submit()}
            okButtonProps={{ loading: isCreatePending }}
            cancelText="Voltar"
            onCancel={onCancel}
            cancelButtonProps={{ disabled: isCreatePending }}
            destroyOnHidden
        >
            <Form
                form={form}
                id="createOfferingForm"
                layout='vertical'
                onFinish={handleFinish}
            >
                <Form.Item
                    name={OFFERING_FORM_NAMES.NAME}
                    label='Nome'
                    rules={RULES}
                >
                    <Input />
                </Form.Item>

                <Flex justify='space-between' gap='small'>
                    <Form.Item
                        name={OFFERING_FORM_NAMES.VALUE}
                        label='Valor'
                        rules={RULES}
                        style={{ width: '50%' }}
                    >
                        <InputNumber controls={false} style={{ width: '100%' }} />
                    </Form.Item>

                    <Form.Item
                        name={OFFERING_FORM_NAMES.DURATION}
                        label='Duração'
                        rules={RULES}
                        style={{ width: '50%' }}
                    >
                        <InputNumber controls={false} style={{ width: '100%' }} />
                    </Form.Item>
                </Flex>

                <Form.Item
                    name={OFFERING_FORM_NAMES.EMPLOYEE_IDS}
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