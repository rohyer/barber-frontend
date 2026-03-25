import { Flex, Form, Input, InputNumber, Modal } from 'antd';
import { useCreateOffering } from '../../useOfferings';
import type { OfferingPayload } from '../../offerings.contract';

type Props = {
    isOpen: boolean,
    onCancel: () => void,
}

export function CreateOfferingModal({ isOpen, onCancel }: Props) {
    const [form] = Form.useForm();

    const { mutateAsync, isPending } = useCreateOffering({ form, onCancel });

    const handleFinish = async (values: OfferingPayload) => {
        await mutateAsync(values);
    };

    return (
        <Modal
            title='Cadastrar serviço'
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
                id="createOfferingForm"
                layout='vertical'
                onFinish={handleFinish}
            >
                <Form.Item
                    name='name'
                    label='Nome'
                    rules={[{ required: true, message: 'Preencha o campo nome' }]}
                >
                    <Input />
                </Form.Item>

                <Flex justify='space-between' gap='small'>
                    <Form.Item
                        name='value'
                        label='Valor'
                        rules={[{ required: true, message: 'Preencha o campo valor' }]}
                        style={{ width: '50%' }}
                    >
                        <InputNumber controls={false} style={{ width: '100%' }} />
                    </Form.Item>

                    <Form.Item
                        name='duration'
                        label='Duração'
                        rules={[{ required: true, message: 'Preencha o campo duração' }]}
                        style={{ width: '50%' }}
                    >
                        <InputNumber controls={false} style={{ width: '100%' }} />
                    </Form.Item>
                </Flex>
                
            </Form>
        </Modal>
    );
}