import dayjs from 'dayjs';
import type { ClientModel, ClientStatus } from '../model/client.type';

export const getClientStatusValues = (
    lastCustomerServiceDate: ClientModel['lastCustomerServiceDate'],
    createdAt: ClientModel['createdAt'],
): ClientStatus => {
    const today = dayjs();
    const createdAtFormatted = dayjs(createdAt);
    const createdAtDifferenceInDays = today.diff(createdAtFormatted, 'day');

    if (lastCustomerServiceDate === null && createdAtDifferenceInDays <= 30)
        return 'new';

    if (lastCustomerServiceDate === null)
        return 'ausent';
    
    const lastCustomerServiceDateFormatted = dayjs(lastCustomerServiceDate);

    const differeceInDays = today.diff(lastCustomerServiceDateFormatted, 'day');

    if (differeceInDays > 30)
        return 'ausent';

    return 'active';
};