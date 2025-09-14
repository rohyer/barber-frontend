import { useState } from 'react';
import type { Client, ClientFormValues } from '../../clients.type';
import { DatePicker, Form, Input, Modal, Select } from 'antd';
import { updateClient } from '../../clients.service';
import dayjs from 'dayjs';

type Props = {
    updateClientModal: Client,
    setUpdateClientModal: React.Dispatch<React.SetStateAction<Client | null>>,
    isOpen: boolean,
    setClients: React.Dispatch<React.SetStateAction<Client[]>>,
    setIsUpdateModalOpen: React.Dispatch<React.SetStateAction<boolean>>,
}

export function UpdateClientModal({
    updateClientModal,
    setUpdateClientModal,
    isOpen,
    setClients,
    setIsUpdateModalOpen,
}: Props) {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const [form] = Form.useForm();

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
    };

    const handleFinish = async (values: ClientFormValues) => {
        try {            
            setError(null);
            setIsLoading(true);

            const payload = {
                ...values,
                birth: values.birth.format('YYYY-MM-DD'),
            };

            const response = await updateClient(updateClientModal.id, payload);

            setClients(prevClients => prevClients
                .map(prevClient => (prevClient.id === response.data.id
                    ? response.data
                    : prevClient
                ))
            );

            handleCancel();
        } catch(error) {
            setError(error instanceof Error ? error.message : 'Erro desconhecido');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Modal
            title="Editar cliente"
            open={isOpen}
            okText="Editar"
            onOk={() => form.submit()}
            okButtonProps={{ loading: isLoading }}
            cancelText='Cancelar'
            onCancel={handleCancel}
            cancelButtonProps={{ disabled: isLoading }}
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