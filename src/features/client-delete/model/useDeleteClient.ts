import { useMutation, useQueryClient } from '@tanstack/react-query';
import { notify } from '../../../shared/utils/notify';
import { deleteClient } from '../../../entities/client/api/deleteClient';
import type { ClientModel } from '../../../entities/client/model/client.type';

export const useDeleteClient = ({ onCancel }: { onCancel: () => void }) => {
    const queryClient = useQueryClient();
    
    const { mutateAsync, isPending } = useMutation({
        mutationFn: (clientId: ClientModel['id']) => deleteClient(clientId),
        onSuccess: (response) => {
            queryClient.invalidateQueries({ queryKey: ['clients'], exact: false });
    
            notify({ message: response.data?.message ?? '' });
    
            onCancel();
        },
        onError: (error) => {
            notify({
                message: 'Erro ao deletar cliente',
                description: error instanceof Error ? error.message : 'Erro desconhecido.',
                type: 'error',
            });
        },
    });

    return { mutateAsync, isPending };
};