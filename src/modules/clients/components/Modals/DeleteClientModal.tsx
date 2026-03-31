import { Modal, Typography } from 'antd';
import React from 'react';
import { deleteClient } from '../../clients.service';
import type { ClientModel } from '../../clients.type';
import { notify } from '../../../../shared/utils/notify';
import { useMutation, useQueryClient } from '@tanstack/react-query';

type Props = {
    isOpen: boolean,
    deleteClientModal: ClientModel,
    setDeleteClientModal: React.Dispatch<React.SetStateAction<ClientModel | null>>,
    setIsDeleteModalOpen: React.Dispatch<React.SetStateAction<boolean>>,
};

export function DeleteClientModal({
    isOpen,
    deleteClientModal,
    setDeleteClientModal,
    setIsDeleteModalOpen,
}: Props) {
    const queryClient = useQueryClient();

    const { mutateAsync, isPending } = useMutation({
        mutationFn: (clientId: ClientModel['id']) => deleteClient(clientId),
        onSuccess: (response) => {
            queryClient.invalidateQueries({ queryKey: ['clients'], exact: false });

            notify({ message: response.message });

            handleCancel();
        },
        onError: (error) => {
            notify({
                message: 'Erro ao deletar cliente',
                description: error instanceof Error ? error.message : 'Erro desconhecido.',
                type: 'error',
            });
        },
    });

    const handleCancel = () => {
        setIsDeleteModalOpen(false);

        setDeleteClientModal(null);
    };

    const handleOk = async () => {
        await mutateAsync(deleteClientModal.id);
    };

    return (
        <Modal
            title="Deletar cliente"
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
            <Typography.Paragraph>
                Deseja mesmo deletar o cliente {deleteClientModal?.name}?
            </Typography.Paragraph>
        </Modal>
    );
}