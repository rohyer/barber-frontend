import { useMutation, useQueryClient } from '@tanstack/react-query';
import { notify } from '../../../shared/lib/notify';
import { createClient, type CreateClient } from '../../../entities/client/api/createClient';

export const useCreateClient = ({ onSuccess }: { onSuccess: () => void }) => {
    const queryClient = useQueryClient();

    const { mutateAsync, isPending } = useMutation({
        mutationFn: (payload: CreateClient['payload']) => createClient(payload),
        onSuccess: () => {
            notify({ message: 'Cliente cadastrado com sucesso' });
                
            queryClient.invalidateQueries({ queryKey: ['clients'], exact: false });
    
            onSuccess();
        },
        onError: (error) => {
            notify({
                message: 'Erro ao cadastrar cliente',
                description: error instanceof Error ? error.message : 'Erro desconhecido.',
                type: 'error',
            });
        }
    });

    return { mutateAsync, isPending };
};