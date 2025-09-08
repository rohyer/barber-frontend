import { Button, Calendar, DatePicker, Form, Input, message, Modal, Select, Space } from 'antd';
import { useState } from 'react';
import { createClient } from '../../clients.service';

type Props ={
    isOpen: boolean,
    onCancel: () => void,
};

export function CreateClientModal({ isOpen, onCancel }: Props) {
    const [form] = Form.useForm();

    const [isLoading, setIsLoading] = useState(false);

    const [error, setError] = useState<string | null>(null);

    const footer = (
        <Space>
            <Button onClick={onCancel}>Voltar</Button>

            <Button
                type='primary'
                htmlType='submit'
                form="createClientModal"
                loading={isLoading}
            >
                    Cadastrar
            </Button>
        </Space>
    );

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

    const handleFinish = async (values: any) => {
        try {
            setIsLoading(true);
            setError(null);

            const response = await createClient(values);

            message.open({
                type: 'success',
                content: 'Cliente cadastrado com sucesso!'
            });
            
        } catch(error) {
            setError(error instanceof Error ? error.message : 'Erro desconhecido');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Modal
            title='Cadastrar cliente'
            open={isOpen}
            onCancel={onCancel}
            footer={footer}
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
                >
                    <DatePicker
                        format='DD/MM/YYYY'
                        placeholder='Selecione a data'
                    />
                </Form.Item>

                <Form.Item
                    name='address'
                    label='Endereço'
                >
                    <Input />
                </Form.Item>
            </Form>
        </Modal>
    );
}