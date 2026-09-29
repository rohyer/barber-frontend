import { Modal, Typography } from 'antd';
import React from 'react';

import type { EmployeeModel } from '../../../entities/employee/model/employee.type';
import { useDeleteEmployee } from '../model/useDeleteEmployee';

type Props = {
    isOpen: boolean,
    deleteEmployeeModal: EmployeeModel,
    setDeleteEmployeeModal: React.Dispatch<React.SetStateAction<EmployeeModel | null>>,
    setIsDeleteModalOpen: React.Dispatch<React.SetStateAction<boolean>>,
};

export function DeleteEmployeeModal({
    isOpen,
    deleteEmployeeModal,
    setDeleteEmployeeModal,
    setIsDeleteModalOpen,
}: Props) {
    const handleCancel = () => {
        setIsDeleteModalOpen(false);

        setDeleteEmployeeModal(null);
    };

    const { mutateAsync: deleteEmployee, isPending: isDeletePending } = useDeleteEmployee({
        onSuccess: handleCancel
    });

    const handleOk = async () => {
        await deleteEmployee(deleteEmployeeModal.id);
    };

    return (
        <Modal
            title="Deletar colaborador"
            open={isOpen}
            okText="Sim"
            onOk={handleOk}
            okButtonProps={{
                danger: true,
                loading: isDeletePending,
            }}
            cancelText="Não"
            onCancel={handleCancel}
            cancelButtonProps={{ disabled: isDeletePending }}
            destroyOnHidden
        >
            <Typography.Paragraph>Deseja mesmo deletar o colaborador {deleteEmployeeModal?.name}?</Typography.Paragraph>
        </Modal>
    );
}