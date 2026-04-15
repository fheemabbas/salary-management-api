import { Employee, SalaryBreakdown } from '../types/employee';

export const getTdsRate = (country: string): number => {
    if (country === 'India') {
        return 0.1;
    }

    if (country === 'United States') {
        return 0.12;
    }

    return 0;
};

export const buildSalaryBreakdown = (
    employee: Employee
): SalaryBreakdown => {
    const gross = employee.salary;
    const tds = gross * getTdsRate(employee.country);

    return {
        gross,
        tds,
        net: gross - tds
    };
};

export const calculateSalary = (employee: Employee): SalaryBreakdown => {
    return buildSalaryBreakdown(employee);
};
