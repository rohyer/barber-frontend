import { useMutation, useQueryClient } from '@tanstack/react-query';

import type { UpdateClient } from '@/entities/client';
import { editClient } from '@/entities/client';
import { notify } from '@/shared/lib';

type MutationFn = {
    id: number,
    payload: UpdateClient['payload']
}

export const useEditClient = ({ onSuccess }: { onSuccess: () => void }) => {
    const queryClient = useQueryClient();

    const { mutateAsync, isPending } = useMutation({
        mutationFn: ({ id, payload }: MutationFn) => editClient(id, payload),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['clients'], exact: false });

            notify({ message: 'Cliente atualizado com sucesso' });

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