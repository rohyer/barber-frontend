import dayjs from 'dayjs';

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