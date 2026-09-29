import { useMutation, useQueryClient } from '@tanstack/react-query';

import type { OfferingModel } from '@/entities/offering';
import { deleteOffering } from '@/entities/offering';
import { notify } from '@/shared/lib';

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