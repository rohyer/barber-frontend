import { useMutation, useQueryClient } from '@tanstack/react-query';

import { notify } from '@/shared/lib';

import { type UpdateOffering,updateOffering } from '../../../entities/offering/api/updateOffering';

export const useEditOffering = ({ onSuccess }: { onSuccess: () => void }) => {
    const queryClient = useQueryClient();

    const { mutateAsync, isPending } = useMutation({
        mutationFn: ({ payload, offeringId }: {payload: UpdateOffering['payload'], offeringId: UpdateOffering['offeringId']}) => updateOffering(offeringId, payload),
        onSuccess: () => {
            notify({ message: 'Serviço atualizado com sucesso' });

            queryClient.invalidateQueries({ queryKey: ['offerings'], exact: false });

            onSuccess();
        },
        onError: (error) => {
            notify({
                message: 'Erro ao atualizar serviço',
                description: error instanceof Error ? error.message : 'Erro desconhecido.',
                type: 'error',
            });
        }
    });

    return { mutateAsync, isPending };
};