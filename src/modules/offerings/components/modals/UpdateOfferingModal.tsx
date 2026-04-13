import { Flex, Form, Input, InputNumber, Modal, Select, Spin, type SelectProps } from 'antd';
import { useQuery } from '@tanstack/react-query';
import { employeeQueryOptions } from '../../offerings.queries';
import type { OfferingFormValues, OfferingModel } from '../../offerings.type';
import { useOfferingMutations } from '../../hooks/useOfferings';
import { OFFERING_FORM_NAMES } from '../../offerings.constant';

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
    const [form] = Form.useForm<OfferingFormValues>();

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

    const parsedEmployees = updateOfferingSelected.employees.map(employee => ({
        label: employee.name,
        value: employee.id
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
                initialValues={{ ...updateOfferingSelected, employeeIds: parsedEmployees }}
                onFinish={(values) => mutateUpdate({ payload: values, offeringId: updateOfferingSelected.id })}
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