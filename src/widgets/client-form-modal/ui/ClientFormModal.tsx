import { DatePicker, Form, Input, Modal, Select, type FormProps } from 'antd';
import { MaskedInput } from '../../../shared/ui/MaskedInput';
import type { ClientFormValues, ClientModel } from '../../../entities/client/model/client.type';
import { useCreateClient } from '../../../features/client-create/model/useCreateClient';
import { useEditClient } from '../../../features/client-edit/model/useEditClient';
import { applyMask, getUnmaskedValue, MASK_PHONE_10, MASK_PHONE_11 } from '../../../shared/utils/mask';
import dayjs from 'dayjs';

const GENDER_OPTIONS = [
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

type Props = {
    isOpen: boolean,
    onClose: () => void
    clientToEdit?: ClientModel,
}

export function ClientFormModal({
    isOpen,
    onClose,
    clientToEdit,
}: Props) {
    const [form] = Form.useForm();

    const isEditing = Boolean(clientToEdit);

    const formMode = isEditing === true
        ? { title: 'Editar cliente', okText: 'Editar' }
        : { title: 'Cadastrar cliente', okText: 'Cadastrar' };

    const handleCancel = () => {
        onClose();
        form.resetFields();
    };

    const { mutateAsync: createClient, isPending: isCreatePending } = useCreateClient({
        onSuccess: handleCancel
    });

    const { mutateAsync: editClient, isPending: isEditPending } = useEditClient({
        onSuccess: handleCancel,
    });

    const isPending = isEditing === true ? isEditPending : isCreatePending;

    const handleFinish = async (values: ClientFormValues) => {
        const payload = {
            ...values,
            birth: values.birth.format('YYYY-MM-DD'),
        };

        if (isEditing && clientToEdit) {
            await editClient({ id: clientToEdit.id, payload });
            return;
        }
        
        await createClient(payload);
    };

    const initialValues: FormProps['initialValues'] = clientToEdit !== undefined ? {
        ...clientToEdit,
        birth: dayjs(clientToEdit.birth),
        phone: applyMask(
            clientToEdit.phone,
            clientToEdit.phone.length > 10 ? MASK_PHONE_11 : MASK_PHONE_10
        )
    } : {};

    return (
        <Modal
            title={formMode.title}
            open={isOpen}
            okText={formMode.okText}
            onOk={() => form.submit()}
            okButtonProps={{ loading: isPending }}
            cancelText="Voltar"
            onCancel={handleCancel}
            cancelButtonProps={{ disabled: isPending }}
            destroyOnHidden
        >
            <Form
                form={form}
                id="clientFormModal"
                layout='vertical'
                initialValues={initialValues}
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
                    <Select options={GENDER_OPTIONS} />
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