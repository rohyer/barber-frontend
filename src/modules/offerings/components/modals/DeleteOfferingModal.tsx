import { Modal, Typography } from 'antd';
import type { OfferingModel } from '../../offerings.type';
import { useOfferingMutations } from '../../useOfferings';

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

    const { mutateDelete, isDeletePending } = useOfferingMutations();

    return (
        <Modal
            title="Deletar serviço"
            open={isOpen}
            okText="Sim"
            onOk={() => mutateDelete(deleteOfferingSelected.id)}
            okButtonProps={{
                danger: true,
                loading: isDeletePending,
            }}
            cancelText="Não"
            onCancel={handleCancel}
            cancelButtonProps={{ disabled: isDeletePending }}
            destroyOnHidden
        >
            <Typography.Paragraph>
                Deseja mesmo deletar o serviço {deleteOfferingSelected?.name}?
            </Typography.Paragraph>
        </Modal>
    );
}