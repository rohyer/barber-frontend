export const calculateAge = (birth: string) => {
    const today = new Date();
    const birthDate = new Date(birth);

    const age = today.getFullYear() - birthDate.getFullYear();

    return age;
};