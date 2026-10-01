import { Modal, Typography } from 'antd';

import type { OfferingModel } from '@/entities/offering';

// TODO: why useDeleteClient instead of useDeleteOffering?
import { useDeleteClient } from '../../client-delete/model/useDeleteClient';

type Props = {
    isOpen: boolean,
    deleteOfferingSelected: OfferingModel,
    setDeleteOfferingSelected: React.Dispatch<React.SetStateAction<OfferingModel | null>>
    setIsDeleteModalOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export function DeleteOfferingModal({
    isOpen,
    deleteOfferingSelected,
    setDeleteOfferingSelected,
    setIsDeleteModalOpen,
}: Props) {
    const handleCancel = () => {
        setIsDeleteModalOpen(false);
        setDeleteOfferingSelected(null);
    };

    const { mutateAsync, isPending } = useDeleteClient({ onCancel: handleCancel });

    return (
        <Modal
            title="Deletar serviço"
            open={isOpen}
            okText="Sim"
            onOk={() => mutateAsync(deleteOfferingSelected.id)}
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
                Deseja mesmo deletar o serviço {deleteOfferingSelected?.name}?
            </Typography.Paragraph>
        </Modal>
    );
}