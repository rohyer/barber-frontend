import { Modal, Typography } from 'antd';
import { useState } from 'react';
import { deleteClient } from '../../clients.service';

type Props = {
    isOpen: boolean,
    clientId: number | null,
    onCancel: () => void,
}

export function DeleteClientModal({ isOpen, clientId, onCancel }: Props) {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleOk = async () => {
        try {
            setIsLoading(true);

            const response = await deleteClient(clientId);

        } catch(error) {
            setError();
        } finally {
            setError(true);
        }
    };

    return (
        <Modal
            title="Deletar cliente"
            open={isOpen}
            okText="Sim"
            onOk={handleOk}
            cancelText="Não"
            onCancel={onCancel}
            destroyOnHidden
        >
            <Typography.Paragraph>Deseja mesmo deleta esse cliente?</Typography.Paragraph>
        </Modal>
    );
}