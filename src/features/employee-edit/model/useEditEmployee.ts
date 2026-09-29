import { useMutation, useQueryClient } from '@tanstack/react-query';

import { notify } from '@/shared/lib';

import {
    type UpdateEmployee,
    updateEmployee } from '../../../entities/employee/api/editEmployee';

type Params = {
    onSuccess: () => void,
}

type MutationFn = {
    id: number,
    payload: UpdateEmployee['payload']
}

export const useEditEmployee = ({ onSuccess }: Params) => {
    const queryClient = useQueryClient();

    const { mutateAsync, isPending } = useMutation({
        mutationFn: ({ id, payload }: MutationFn) => updateEmployee(id, payload),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['employees'], exact: false });

            notify({ message: 'Colaborador editado com sucesso' });

            onSuccess();
        },
        onError: (error) => {
            notify({
                message: 'Erro ao atualizar colaborador',
                description: error instanceof Error ? error.message : 'Erro desconhecido.',
                type: 'error'
            });
        } 
    });

    return { mutateAsync, isPending };
};