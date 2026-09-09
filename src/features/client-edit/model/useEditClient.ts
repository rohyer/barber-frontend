import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateClient } from '../../../modules/clients/clients.service';
import { notify } from '../../../shared/utils/notify';
import type { UpdateClient } from '../../../entities/client/api/client.contract';

type MutationFn = {
    id: number,
    payload: UpdateClient['payload']
}

export const useEditClient = ({ onSuccess }: { onSuccess: () => void }) => {
    const queryClient = useQueryClient();

    const { mutateAsync, isPending } = useMutation({
        mutationFn: ({ id, payload }: MutationFn) => updateClient(id, payload),
        onSuccess: (response) => {
            queryClient.invalidateQueries({ queryKey: ['clients'], exact: false });

            notify({ message: response.message });

            onSuccess();
        },
        onError: (error) => {
            notify({
                message: 'Erro ao atualizar cliente',
                description: error instanceof Error ? error.message : 'Erro desconhecido.',
                type: 'error'
            });
        } 
    });

    return { mutateAsync, isPending };
};