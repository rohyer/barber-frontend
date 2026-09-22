import { useMutation, useQueryClient } from '@tanstack/react-query';
import { notify } from '../../../shared/lib/notify';
import { createEmployee, type CreateEmployee } from '../../../entities/employee/api/createEmployee';

type Params = {
    onSuccess: () => void,
}

export const useCreateEmplyee = ({ onSuccess }: Params) => {
    const queryClient = useQueryClient();
    
    const { mutateAsync, isPending } = useMutation({
        mutationFn: (payload: CreateEmployee['payload']) => createEmployee(payload),
        onSuccess: () => {
            notify({ message: 'Colaborador cadastrado com sucesso' });
                
            queryClient.invalidateQueries({ queryKey: ['employees'], exact: false });
    
            onSuccess();
        },
        onError: (error) => {
            notify({
                message: 'Erro ao cadastrar colaborador',
                description: error instanceof Error ? error.message : 'Erro desconhecido.',
                type: 'error',
            });
        }
    });

    return { mutateAsync, isPending };
};