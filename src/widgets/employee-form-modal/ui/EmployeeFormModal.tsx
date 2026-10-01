import { DatePicker, Form, type FormProps,Input, Modal, Select } from 'antd';
import type { Dayjs } from 'dayjs';
import dayjs from 'dayjs';

import type { EmployeeModel } from '@/entities/employee';
import { useCreateEmplyee } from '@/features/employee-create';
import { useEditEmployee } from '@/features/employee-edit';
import { applyMask, MASK_PHONE_10, MASK_PHONE_11 } from '@/shared/lib';

import { MaskedInput } from '../../../shared/ui/MaskedInput';

type Props = {
    isOpen: boolean,
    employeeToEdit?: EmployeeModel,
    onClose: () => void
}

type EmployeeFormValues = Pick<EmployeeModel,
    | 'name'
    | 'sex'
    | 'phone'
    | 'address'
> & { birth: Dayjs }

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

export function EmployeeFormModal({ isOpen, employeeToEdit, onClose }: Props) {
    const [form] = Form.useForm();

    const isEditing = Boolean(employeeToEdit);

    const formMode = isEditing === true
        ? { title: 'Editar colaborador', okText: 'Editar' }
        : { title: 'Cadastrar colaborador', okText: 'Cadastrar' };

    const handleCancel = () => {
        onClose();
        form.resetFields();
    };

    const { mutateAsync: createEmployee, isPending: isCreatePending } = useCreateEmplyee({
        onSuccess: handleCancel
    });

    const { mutateAsync: editEmployee, isPending: isEditPending } = useEditEmployee({
        onSuccess: handleCancel
    });

    const isPending = isEditing === true ? isEditPending : isCreatePending;

    const handleFinish = async (values: EmployeeFormValues) => {
        const payload = {
            ...values,
            birth: values.birth.format('YYYY-MM-DD'),
        };

        if (isEditing && employeeToEdit) {
            await editEmployee({ id: employeeToEdit.id, payload });
            return;
        }
        
        await createEmployee(payload);
    };

    const initialValues: FormProps['initialValues'] = employeeToEdit !== undefined ? {
        ...employeeToEdit,
        birth: dayjs(employeeToEdit.birth),
        phone: applyMask(
            employeeToEdit.phone,
            employeeToEdit.phone.length > 10 ? MASK_PHONE_11 : MASK_PHONE_10
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
            onCancel={onClose}
            cancelButtonProps={{ disabled: isPending }}
            destroyOnHidden
        >
            <Form
                form={form}
                id="employeeFormModal"
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