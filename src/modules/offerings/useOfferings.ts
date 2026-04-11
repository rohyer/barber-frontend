import { useMutation, useQueryClient } from '@tanstack/react-query';
import { notify } from '../../shared/utils/notify';
import type { FormInstance } from 'antd';
import { createOffering, updateOffering } from './offerings.service';
import type { CreateOffering } from './offerings.contract';

type UseCreateOffering = {
    form: FormInstance,
    onCancel: () => void,
}

export const useCreateOffering = ({ form, onCancel }: UseCreateOffering) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (payload: CreateOffering['payload']) => createOffering(payload),
        onSuccess: (response) => {
            notify({ message: response.message });

            queryClient.invalidateQueries({ queryKey: ['offerings'], exact: false });

            onCancel();

            form.resetFields();
        },
        onError: (error) => {
            notify({
                message: 'Erro ao cadastrar serviço',
                description: error instanceof Error ? error.message : 'Erro desconhecido.',
                type: 'error',
            });
        }
    });
};

export const useUpdateOffering = ({ form, onCancel }: UseCreateOffering) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (payload: CreateOffering['payload']) => updateOffering(payload),
        onSuccess: (response) => {
            notify({ message: response.message });

            queryClient.invalidateQueries({ queryKey: ['offerings'], exact: false });

            onCancel();

            form.resetFields();
        },
        onError: (error) => {
            notify({
                message: 'Erro ao atualizar serviço',
                description: error instanceof Error ? error.message : 'Erro desconhecido.',
                type: 'error',
            });
        }
    });
};