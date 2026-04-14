export interface Employee {
    id: number;
    fullName: string;
    jobTitle: string;
    country: string;
    salary: number;
}

export type CreateEmployeePayload = Omit<Employee, 'id'>;
