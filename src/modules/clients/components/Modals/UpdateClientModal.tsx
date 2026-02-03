import type { ClientModel, ClientFormValues } from '../../clients.type';
import { DatePicker, Form, Input, Modal, Select } from 'antd';
import { updateClient } from '../../clients.service';
import dayjs from 'dayjs';
import { notify } from '../../../../shared/utils/notify';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { UpdateClient } from '../../clients.contract';
import { MaskedInput } from '../../../../design-system';
import { applyMask, getUnmaskedValue, MASK_PHONE_10, MASK_PHONE_11 } from '../../../../shared/utils/mask';

type MutationFn = {
    id: number,
    payload: UpdateClient['payload']
}

type Props = {
    isOpen: boolean,
    updateClientModal: ClientModel,
    setUpdateClientModal: React.Dispatch<React.SetStateAction<ClientModel | null>>,
    setIsUpdateModalOpen: React.Dispatch<React.SetStateAction<boolean>>,
}

export function UpdateClientModal({
    isOpen,
    updateClientModal,
    setUpdateClientModal,
    setIsUpdateModalOpen,
}: Props) {
    const [form] = Form.useForm();

    const queryClient = useQueryClient();

    const { mutateAsync, isPending } = useMutation({
        mutationFn: ({ id, payload }: MutationFn) => updateClient(id, payload),
        onSuccess: (response) => {
            queryClient.invalidateQueries({ queryKey: ['clients'], exact: false });

            notify({ message: response.message });

            handleCancel();
        },
        onError: (error) => {
            notify({
                message: 'Erro ao atualizar cliente',
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
        setUpdateClientModal(null);

        form.resetFields();
    };

    const handleFinish = async (values: ClientFormValues) => {
        const payload = {
            ...values,
            birth: values.birth.format('YYYY-MM-DD'),
        };
        
        await mutateAsync({ id: updateClientModal.id, payload });
    };

    const maskPattern = updateClientModal.phone.length > 10
        ? MASK_PHONE_11
        : MASK_PHONE_10;

    return (
        <Modal
            title="Editar cliente"
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
                    ...updateClientModal,
                    birth: dayjs(updateClientModal.birth),
                    phone: applyMask(updateClientModal.phone, maskPattern),
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