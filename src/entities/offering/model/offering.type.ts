import type { EmployeeModel } from '@/entities/employee/@x/offering.type';

export type OfferingModel = {
    id: number,
    name: string,
    value: number,
    duration: number,
    employees: Pick<EmployeeModel, 'id' | 'name'>[],
}