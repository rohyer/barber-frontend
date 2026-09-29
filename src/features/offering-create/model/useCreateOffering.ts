import { useMutation, useQueryClient } from '@tanstack/react-query';

import { notify } from '@/shared/lib';

import { type CreateOffering,createOffering } from '../../../entities/offering/api/createOffering';

export const useCreateOffering = ({ onSuccess }: { onSuccess: () => void }) => {
    const queryClient = useQueryClient();

    const { mutateAsync, isPending } =  useMutation({
        mutationFn: (payload: CreateOffering['payload']) => createOffering(payload),
        onSuccess: () => {
            notify({ message: 'Serviço cadastrado com sucesso' });

            queryClient.invalidateQueries({ queryKey: ['offerings'], exact: false });
            
            onSuccess();
        },
        onError: (error) => {
            notify({
                message: 'Erro ao cadastrar serviço',
                description: error instanceof Error ? error.message : 'Erro desconhecido.',
                type: 'error',
            });
        }
    });

    return { mutateAsync, isPending };
};