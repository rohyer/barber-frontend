import { DatePicker, Form, Input, Modal, Select } from 'antd';
import { createClient } from '../../clients.service';
import type { ClientFormValues } from '../../clients.type';
import { notify } from '../../../../shared/utils/notify';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { CreateClient } from '../../clients.contract';

type Props = {
    isOpen: boolean,
    onCancel: () => void,
};

export function CreateClientModal({ isOpen, onCancel }: Props) {
    const [form] = Form.useForm();

    const queryClient = useQueryClient();

    const { mutateAsync, isPending } = useMutation({
        mutationFn: (payload: CreateClient['payload']) => createClient(payload),
        onSuccess: (response) => {
            notify({ message: response.message });
            
            queryClient.invalidateQueries({ queryKey: ['clients'], exact: false });

            onCancel();

            form.resetFields();
        },
        onError: (error) => {
            notify({
                message: 'Erro ao cadastrar cliente',
                description: error instanceof Error ? error.message : 'Erro desconhecido.',
                type: 'error',
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

    const handleFinish = async (values: ClientFormValues) => {
        const payload = {
            ...values,
            birth: values.birth.format('YYYY-MM-DD'),
        };

        await mutateAsync(payload);
    };

    return (
        <Modal
            title='Cadastrar cliente'
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