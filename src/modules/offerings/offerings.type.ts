import type { OFFERING_FORM_NAMES } from './offerings.constant';

export type Employee = {
    id: number;
    name: string;
}

export type OfferingModel = {
    id: number,
    name: string,
    value: number,
    duration: number,
    employees: Employee[],
}

export type OfferingFormValues = {
    [OFFERING_FORM_NAMES.NAME]: string,
    [OFFERING_FORM_NAMES.VALUE]: number,
    [OFFERING_FORM_NAMES.DURATION]: number,
    [OFFERING_FORM_NAMES.EMPLOYEE_IDS]: number[],
}