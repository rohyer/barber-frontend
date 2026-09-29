import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { OfferingModel } from '../../../entities/offering/model/offering.type';
import { deleteOffering } from '../../../entities/offering/api/deleteOffering';
import { notify } from '../../../shared/lib/notify';

export const useDeleteOffering = () => {
    const queryClient = useQueryClient();

    const { mutateAsync, isPending } = useMutation({
        mutationFn: (offeringId: OfferingModel['id']) => deleteOffering(offeringId),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['offerings'], exact: false });
    
            notify({ message: 'Serviço excluído com sucesso' });    
        },
        onError: (error) => {
            notify({
                message: 'Erro ao excluir serviço',
                description: error instanceof Error ? error.message : 'Erro desconhecido.',
                type: 'error',
            });
        }
    });

    return { mutateAsync, isPending };
};