import { Modal, Typography } from 'antd';
import React, { useState } from 'react';
import { deleteClient } from '../../clients.service';
import type { Client } from '../../clients.type';

type Props = {
    isOpen: boolean,
    deleteClientModal: Client,
    setDeleteClientModal: React.Dispatch<React.SetStateAction<Client | null>>,
    setClients: React.Dispatch<React.SetStateAction<Client[]>>,
    setIsDeleteModalOpen: React.Dispatch<React.SetStateAction<boolean>>,
};

export function DeleteClientModal({
    isOpen,
    deleteClientModal,
    setDeleteClientModal,
    setClients,
    setIsDeleteModalOpen,
}: Props) {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleCancel = () => {
        setIsDeleteModalOpen(false);

        setDeleteClientModal(null);
    };

    const handleOk = async () => {
        try {
            setIsLoading(true);

            const response = await deleteClient(deleteClientModal.id);

            setClients(prevClients => prevClients
                .filter(prevClient => prevClient.id !== deleteClientModal.id));

            handleCancel();
        } catch(error) {
            setError(error instanceof Error ? error.message : 'Erro desconhecido');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Modal
            title="Deletar cliente"
            open={isOpen}
            okText="Sim"
            onOk={handleOk}
            okButtonProps={{
                danger: true,
                loading: isLoading,
            }}
            cancelText="Não"
            onCancel={handleCancel}
            cancelButtonProps={{ disabled: isLoading }}
            destroyOnHidden
        >
            <Typography.Paragraph>Deseja mesmo deletar o cliente {deleteClientModal?.name}?</Typography.Paragraph>
        </Modal>
    );
}