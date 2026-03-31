import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Modal, Typography } from 'antd';
import type { OfferingModel } from '../../offerings.type';
import { deleteOffering } from '../../offerings.service';
import { notify } from '../../../../shared/utils/notify';

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
    const queryClient = useQueryClient();

    const { mutateAsync, isPending } = useMutation({
        mutationFn: (offeringId: OfferingModel['id']) => deleteOffering(offeringId),
        onSuccess: (response) => {
            queryClient.invalidateQueries({ queryKey: ['offerings'], exact: false });

            notify({ message: response.message });

            handleCancel();
        },
        onError: (error) => {
            notify({
                message: 'Erro ao deletar serviço',
                description: error instanceof Error ? error.message : 'Erro desconhecido.',
                type: 'error',
            });
        }
    });

    const handleCancel = () => {
        setIsDeleteModalOpen(false);
        setDeleteOfferingSelected(null);
    };

    const handleOk = async () => {
        await mutateAsync(deleteOfferingSelected.id);
    };

    return (
        <Modal
            title="Deletar serviço"
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
                Deseja mesmo deletar o serviço {deleteOfferingSelected?.name}?
            </Typography.Paragraph>
        </Modal>
    );
}