import dayjs from 'dayjs';
import type { ClientModel, GetClientStatusValues } from './clients.type';

export const calculateAge = (birth: string) => {
    const today = new Date();
    const birthDate = new Date(birth);

    const age = today.getFullYear() - birthDate.getFullYear();

    return age;
};

export const getClientStatus = (lastCustomerServiceDate: string | null) => {
    if (lastCustomerServiceDate === null)
        return null;

    const lastCustomerServiceDateFormatted = dayjs(lastCustomerServiceDate);
    const today = dayjs();

    return today.diff(lastCustomerServiceDateFormatted, 'day');
};

export const getClientStatusValues = (
    lastCustomerServiceDate: ClientModel['lastCustomerServiceDate'],
    createdAt: ClientModel['createdAt'],
): GetClientStatusValues => {
    const today = dayjs();
    const createdAtFormatted = dayjs(createdAt);
    const createdAtDifferenceInDays = today.diff(createdAtFormatted, 'day');

    if (lastCustomerServiceDate === null && createdAtDifferenceInDays <= 30) 
        return ({
            title: 'Cliente cadastrado ainda sem atendimento',
            color: 'blue',
            status: 'Novo',
        });

    if (lastCustomerServiceDate === null) 
        return ({
            title: 'Último atendimento feito a mais de 30 dias',
            color: 'red-inverse',
            status: 'Ausente',
        });
    
    const lastCustomerServiceDateFormatted = dayjs(lastCustomerServiceDate);

    const differeceInDays = today.diff(lastCustomerServiceDateFormatted, 'day');

    if (differeceInDays > 30) 
        return ({
            title: 'Último atendimento feito a mais de 30 dias',
            color: 'red-inverse',
            status: 'Ausente'
        });

    return ({
        title: 'Último atendimento feito em menos de 30 dias',
        color: 'blue-inverse',
        status: 'Ativo'
    });
};