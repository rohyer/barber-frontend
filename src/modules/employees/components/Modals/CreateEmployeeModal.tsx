import { DatePicker, Form, Input, Modal, Select } from 'antd';
import { createEmployee } from '../../employees.service';
import type { EmployeeFormValues } from '../../employees.type';
import { notify } from '../../../../shared/utils/notify';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { CreateEmployee } from '../../employees.contract';
import { MaskedInput } from '../../../../design-system';

type Props = {
    isOpen: boolean,
    onCancel: () => void,
};

export function CreateEmployeeModal({ isOpen, onCancel }: Props) {
    const [form] = Form.useForm();

    const queryClient = useQueryClient();

    const { mutateAsync, isPending } = useMutation({
        mutationFn: (payload: CreateEmployee['payload']) => createEmployee(payload),
        onSuccess: (response) => {
            notify({ message: response.message });
            
            queryClient.invalidateQueries({ queryKey: ['employees'], exact: false });

            onCancel();

            form.resetFields();
        },
        onError: (error) => {
            notify({
                message: 'Erro ao cadastrar colaborador',
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

    const handleFinish = async (values: EmployeeFormValues) => {
        const payload = {
            ...values,
            birth: values.birth.format('YYYY-MM-DD'),
        };

        await mutateAsync(payload);
    };

    return (
        <Modal
            title='Cadastrar colaborador'
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
                id="createEmployeeModal"
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