import type { Client, ClientFormValues } from '../../clients.type';
import { DatePicker, Form, Input, Modal, Select } from 'antd';
import { updateClient } from '../../clients.service';
import dayjs from 'dayjs';
import { notify } from '../../../../shared/utils/notify';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { UpdateClient } from '../../clients.contract';

type MutationFn = {
    id: number,
    payload: UpdateClient['payload']
}

type Props = {
    isOpen: boolean,
    updateClientModal: Client,
    setUpdateClientModal: React.Dispatch<React.SetStateAction<Client | null>>,
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
                    birth: dayjs(updateClientModal.birth)
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
                >
                    <Input />
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