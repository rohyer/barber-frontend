import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteEmployee } from '../../../entities/employee/api/deleteEmployee';
import { notify } from '../../../shared/lib/notify';
import type { EmployeeModel } from '../../../entities/employee/model/employee.type';

type Params = {
    onSuccess: () => void,
}

export const useDeleteEmployee = ({ onSuccess }: Params) => {
    const queryClient = useQueryClient();

    const { mutateAsync, isPending } = useMutation({
        mutationFn: (employeeId: EmployeeModel['id']) => deleteEmployee(employeeId),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['employees'], exact: false });

            notify({ message: 'Colaborador excluído com sucesso' });

            onSuccess();
        },
        onError: (error) => {
            notify({
                message: 'Erro ao deletar colaborador',
                description: error instanceof Error ? error.message : 'Erro desconhecido.',
                type: 'error',
            });
        },
    });

    return { mutateAsync, isPending };
};