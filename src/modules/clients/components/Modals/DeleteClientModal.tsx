import { Modal, Typography } from 'antd';
import React from 'react';
import { deleteClient } from '../../clients.service';
import type { Client } from '../../clients.type';
import { notify } from '../../../../shared/utils/notify';
import { useMutation } from '@tanstack/react-query';

type Props = {
    isOpen: boolean,
    deleteClientModal: Client,
    setDeleteClientModal: React.Dispatch<React.SetStateAction<Client | null>>,
    setIsDeleteModalOpen: React.Dispatch<React.SetStateAction<boolean>>,
};

export function DeleteClientModal({
    isOpen,
    deleteClientModal,
    setDeleteClientModal,
    setIsDeleteModalOpen,
}: Props) {
    const { mutateAsync, isPending } = useMutation({
        mutationFn: (clientId: Client['id']) => deleteClient(clientId),
        onSuccess: (response) => {
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
            <Typography.Paragraph>Deseja mesmo deletar o cliente {deleteClientModal?.name}?</Typography.Paragraph>
        </Modal>
    );
}