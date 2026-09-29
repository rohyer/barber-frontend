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