type employees = {
    id: number;
    name: string;
}

export type OfferingModel = {
    id: number,
    name: string,
    value: number,
    duration: number,
    employees: employees[],
}