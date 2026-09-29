import {
    Flex,
    Form,
    Input,
    InputNumber,
    Modal,
    Select,
    Spin,
    type FormProps,
    type SelectProps,
} from 'antd';
import type { OfferingModel } from '../../../entities/offering/model/offering.type';
import { useCreateOffering } from '../../../features/offering-create/model/useCreateOffering';
import { useEditOffering } from '../../../features/offering-edit/model/useEditOffering';
import { useQuery } from '@tanstack/react-query';
import { employeeQueryOptions } from '../model/offeringFormModal.query';

type OfferingFormValues = Pick<OfferingModel,
    | 'name'
    | 'value'
    | 'duration'
> & { employeeIds: number[] }

type Props = {
    isOpen: boolean,
    onClose: () => void,
    offeringToEdit?: OfferingModel,
}

const RULES = [{ required: true, message: 'Campo de preenchimento obrigatório' }];

export function OfferingFormModal({ isOpen, onClose, offeringToEdit }: Props) {
    const [form] = Form.useForm();
    
    const isEditing = Boolean(offeringToEdit);
    
    const formMode = isEditing === true
        ? { title: 'Editar serviço', okText: 'Editar' }
        : { title: 'Cadastrar serviço', okText: 'Cadastrar' };
    
    const handleCancel = () => {
        onClose();
        form.resetFields();
    };

    const { data, isPending: isSelectPending } = useQuery(employeeQueryOptions());
    
    const { mutateAsync: createOffering, isPending: isCreatePending } = useCreateOffering({
        onSuccess: handleCancel
    });
    
    const { mutateAsync: editOffering, isPending: isEditPending } = useEditOffering({
        onSuccess: handleCancel,
    });
    
    const isPending = isEditing === true ? isEditPending : isCreatePending;
    
    const handleFinish = async (values: OfferingFormValues) => {
        const payload = {
            ...values,
        };
    
        if (isEditing && offeringToEdit) {
            await editOffering({ offeringId: offeringToEdit.id, payload });
            return;
        }
            
        await createOffering(payload);
    };

    const options: SelectProps['options'] = data?.data?.employees.map(employee => ({
        value: employee.id,
        label: employee.name,
    }));

    const parsedEmployees = offeringToEdit?.employees.map(employee => ({
        label: employee.name,
        value: employee.id
    }));

    const initialValues: FormProps['initialValues'] = offeringToEdit !== undefined ? {
        ...offeringToEdit,
        employeeIds: parsedEmployees,
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
                id="createOfferingForm"
                layout='vertical'
                initialValues={initialValues}
                onFinish={handleFinish}
            >
                <Form.Item
                    name='name'
                    label='Nome'
                    rules={RULES}
                >
                    <Input />
                </Form.Item>

                <Flex justify='space-between' gap='small'>
                    <Form.Item
                        name='value'
                        label='Valor'
                        rules={RULES}
                        style={{ width: '50%' }}
                    >
                        <InputNumber controls={false} style={{ width: '100%' }} />
                    </Form.Item>

                    <Form.Item
                        name='duration'
                        label='Duração'
                        rules={RULES}
                        style={{ width: '50%' }}
                    >
                        <InputNumber controls={false} style={{ width: '100%' }} />
                    </Form.Item>
                </Flex>

                <Form.Item
                    name='employeeIds'
                    label='Colaboradores'
                    rules={RULES}
                    style={{ width: '100%' }}
                >
                    <Select
                        mode='multiple'
                        options={options}
                        loading={isSelectPending}
                        notFoundContent={isSelectPending ? <Spin /> : null}
                        allowClear
                    />
                </Form.Item>
            </Form>
        </Modal>
    );
}