import { Modal, Typography } from 'antd';
import React from 'react';
import { deleteEmployee } from '../../employees.service';
import type { EmployeeModel } from '../../employees.type';
import { notify } from '../../../../shared/utils/notify';
import { useMutation, useQueryClient } from '@tanstack/react-query';

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
    const queryClient = useQueryClient();

    const { mutateAsync, isPending } = useMutation({
        mutationFn: (employeeId: EmployeeModel['id']) => deleteEmployee(employeeId),
        onSuccess: (response) => {
            queryClient.invalidateQueries({ queryKey: ['employees'], exact: false });

            notify({ message: response.message });

            handleCancel();
        },
        onError: (error) => {
            notify({
                message: 'Erro ao deletar colaborador',
                description: error instanceof Error ? error.message : 'Erro desconhecido.',
                type: 'error',
            });
        },
    });

    const handleCancel = () => {
        setIsDeleteModalOpen(false);

        setDeleteEmployeeModal(null);
    };

    const handleOk = async () => {
        await mutateAsync(deleteEmployeeModal.id);
    };

    return (
        <Modal
            title="Deletar colaborador"
            open={isOpen}
            okText="Sim"
            onOk={handleOk}
            okButtonProps={{
                danger: true,
                loading: isPending,
            }}
            cancelText="Não"
            onCancel={handleCancel}
            cancelButtonProps={{ disabled: isPending }}
            destroyOnHidden
        >
            <Typography.Paragraph>Deseja mesmo deletar o colaborador {deleteEmployeeModal?.name}?</Typography.Paragraph>
        </Modal>
    );
}