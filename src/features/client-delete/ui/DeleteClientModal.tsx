import { Modal, Typography } from 'antd';
import React from 'react';
import type { ClientModel } from '../../../entities/client/model/client.type';
import { useDeleteClient } from '../model/useDeleteClient';

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

    const handleCancel = () => {
        setIsDeleteModalOpen(false);
        setDeleteClientModal(null);
    };

    const { mutateAsync, isPending } = useDeleteClient({ onCancel: handleCancel });

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