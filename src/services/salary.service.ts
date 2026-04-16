import { SalaryBreakdown } from '../types/employee';

export const calculateSalary = (gross: number, country: string): SalaryBreakdown => {
    let tds = 0;

    if (country === 'India') {
        tds = gross * 0.1;
    } else if (country === 'United States') {
        tds = gross * 0.12;
    }

    return {
        gross,
        tds,
        net: gross - tds
    };
};
