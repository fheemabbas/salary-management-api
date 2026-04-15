export interface Employee {
    id: number;
    fullName: string;
    jobTitle: string;
    country: string;
    salary: number;
}

export type CreateEmployeePayload = Omit<Employee, 'id'>;

export interface CreateEmployeeResponse {
    id: number;
    message: string;
}

export interface SalaryBreakdown {
    gross: number;
    tds: number;
    net: number;
}

export interface CountryMetrics {
    min: number;
    max: number;
    average: number;
}

export interface JobTitleMetrics {
    average: number;
}
