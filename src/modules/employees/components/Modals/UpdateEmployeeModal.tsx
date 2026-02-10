import type { EmployeeModel, EmployeeFormValues } from '../../employees.type';
import { DatePicker, Form, Input, Modal, Select } from 'antd';
import { updateEmployee } from '../../employees.service';
import dayjs from 'dayjs';
import { notify } from '../../../../shared/utils/notify';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { UpdateEmployee } from '../../employees.contract';
import { MaskedInput } from '../../../../design-system';
import { applyMask, getUnmaskedValue, MASK_PHONE_10, MASK_PHONE_11 } from '../../../../shared/utils/mask';

type MutationFn = {
    id: number,
    payload: UpdateEmployee['payload']
}

type Props = {
    isOpen: boolean,
    updateEmployeeModal: EmployeeModel,
    setUpdateEmployeeModal: React.Dispatch<React.SetStateAction<EmployeeModel | null>>,
    setIsUpdateModalOpen: React.Dispatch<React.SetStateAction<boolean>>,
}

export function UpdateEmployeeModal({
    isOpen,
    updateEmployeeModal,
    setUpdateEmployeeModal,
    setIsUpdateModalOpen,
}: Props) {
    const [form] = Form.useForm();

    const queryClient = useQueryClient();

    const { mutateAsync, isPending } = useMutation({
        mutationFn: ({ id, payload }: MutationFn) => updateEmployee(id, payload),
        onSuccess: (response) => {
            queryClient.invalidateQueries({ queryKey: ['employees'], exact: false });

            notify({ message: response.message });

            handleCancel();
        },
        onError: (error) => {
            notify({
                message: 'Erro ao atualizar colaborador',
                description: error instanceof Error ? error.message : 'Erro desconhecido.',
                type: 'error'
            });
        } 
    });

    const options = [
        {
            label: 'Masculino',
            value: 'M'
        },
        {
            label: 'Feminino',
            value: 'F'
        },
        {
            label: 'Outro',
            value: 'Outro'
        },
    ];

    const handleCancel = () => {
        setIsUpdateModalOpen(false);
        setUpdateEmployeeModal(null);

        form.resetFields();
    };

    const handleFinish = async (values: EmployeeFormValues) => {
        const payload = {
            ...values,
            birth: values.birth.format('YYYY-MM-DD'),
        };
        
        await mutateAsync({ id: updateEmployeeModal.id, payload });
    };

    const maskPattern = updateEmployeeModal.phone.length > 10
        ? MASK_PHONE_11
        : MASK_PHONE_10;

    return (
        <Modal
            title="Editar colaborador"
            open={isOpen}
            okText="Editar"
            onOk={() => form.submit()}
            okButtonProps={{ loading: isPending }}
            cancelText='Cancelar'
            onCancel={handleCancel}
            cancelButtonProps={{ disabled: isPending }}
            destroyOnHidden
        >
            <Form
                form={form}
                initialValues={{
                    ...updateEmployeeModal,
                    birth: dayjs(updateEmployeeModal.birth),
                    phone: applyMask(updateEmployeeModal.phone, maskPattern),
                }}
                layout='vertical'
                onFinish={handleFinish}
            >
                <Form.Item
                    name='name'
                    label='Nome'
                    rules={[{ required: true, message: 'Preencha o campo nome.' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    name='sex'
                    label='Sexo'
                    rules={[{ required: true, message: 'Preencha o campo sexo.' }]}
                >
                    <Select options={options} />
                </Form.Item>

                <Form.Item
                    name='phone'
                    label='Telefone'
                    rules={[{ required: true, message: 'Preencha o campo telefone.' }]}
                    getValueFromEvent={(event) => getUnmaskedValue(event.target.value || event)}
                >
                    <MaskedInput name='phone' />
                </Form.Item>

                <Form.Item
                    name='birth'
                    label='Data de nascimento'
                    rules={[{ required: true, message: 'Preencha o campo Data de nascimento' }]}
                >
                    <DatePicker
                        format='DD/MM/YYYY'
                        placeholder='Selecione a data'
                    />
                </Form.Item>

                <Form.Item
                    name='address'
                    label='Endereço'
                    rules={[{ required: true, message: 'Preencha o campo Endereço' }]}
                >
                    <Input />
                </Form.Item>
            </Form>
        </Modal>
    );
}