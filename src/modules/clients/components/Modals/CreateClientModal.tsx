import { DatePicker, Form, Input, Modal, Select } from 'antd';
import { useState } from 'react';
import { createClient } from '../../clients.service';
import type { ClientFormValues, Client } from '../../clients.type';
import { notify } from '../../../../shared/utils/notify';

type Props = {
    isOpen: boolean,
    onCancel: () => void,
    setClients: React.Dispatch<React.SetStateAction<Client[]>>
};

export function CreateClientModal({ isOpen, onCancel, setClients }: Props) {
    const [form] = Form.useForm();

    const [isLoading, setIsLoading] = useState(false);

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

    const handleFinish = async (values: ClientFormValues) => {
        try {
            setIsLoading(true);

            const payload = {
                ...values,
                birth: values.birth.format('YYYY-MM-DD'),
            };

            const response = await createClient(payload);
            
            setClients(prevClients => ([ ...prevClients, response.data]));            
            
            notify({ message: response.message });
            
            onCancel();
        } catch(error) {
            notify({
                message: 'Erro ao cadastrar cliente',
                description: error instanceof Error ? error.message : 'Erro desconhecido.',
                type: 'error',
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Modal
            title='Cadastrar cliente'
            open={isOpen}
            okText="Cadastrar"
            onOk={() => form.submit()}
            okButtonProps={{ loading: isLoading }}
            cancelText="Voltar"
            onCancel={onCancel}
            cancelButtonProps={{ disabled: isLoading }}
            destroyOnHidden
        >
            <Form
                form={form}
                id="createClientModal"
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