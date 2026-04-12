import { useMutation, useQueryClient } from '@tanstack/react-query';
import { notify } from '../../../shared/utils/notify';
import { createOffering, deleteOffering, updateOffering } from '../offerings.service';
import type { CreateOffering, UpdateOffering } from '../offerings.contract';
import type { OfferingModel } from '../offerings.type';

export const useOfferingMutations = () => {
    const queryClient = useQueryClient();

    const handleError = (message: string, error: unknown) => (
        notify({
            message,
            description: error instanceof Error ? error.message : 'Erro desconhecido.',
            type: 'error',
        })
    );

    const { mutate: mutateCreate, isPending: isCreatePending } =  useMutation({
        mutationFn: (payload: CreateOffering['payload']) => createOffering(payload),
        onSuccess: (response) => {
            notify({ message: response.message });

            queryClient.invalidateQueries({ queryKey: ['offerings'], exact: false });
        },
        onError: (error) => handleError('Erro ao cadastrar serviço', error)
    });

    const { mutate: mutateUpdate, isPending: isUpdatePending } = useMutation({
        mutationFn: ({ payload, offeringId }: {payload: UpdateOffering['payload'], offeringId: UpdateOffering['offeringId']}) =>
            updateOffering(offeringId, payload),
        onSuccess: (response) => {
            notify({ message: response.message });

            queryClient.invalidateQueries({ queryKey: ['offerings'], exact: false });
        },
        onError: (error) => handleError('Erro ao atualizar serviço', error)
    });

    const { mutate: mutateDelete, isPending: isDeletePending } = useMutation({
        mutationFn: (offeringId: OfferingModel['id']) => deleteOffering(offeringId),
        onSuccess: (response) => {
            queryClient.invalidateQueries({ queryKey: ['offerings'], exact: false });
    
            notify({ message: response.message });    
        },
        onError: (error) => handleError('Erro ao deletar serviço', error)
    });

    return {
        mutateCreate,
        isCreatePending,
        mutateUpdate,
        isUpdatePending,
        mutateDelete,
        isDeletePending
    };
};