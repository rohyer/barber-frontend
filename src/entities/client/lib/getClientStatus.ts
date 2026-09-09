import dayjs from 'dayjs';

export const getClientStatus = (lastCustomerServiceDate: string | null) => {
    if (lastCustomerServiceDate === null)
        return null;

    const lastCustomerServiceDateFormatted = dayjs(lastCustomerServiceDate);
    const today = dayjs();

    return today.diff(lastCustomerServiceDateFormatted, 'day');
};