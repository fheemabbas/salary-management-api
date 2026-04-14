import { CountryMetrics, Employee, JobTitleMetrics } from '../types/employee';

/**
 * Extract salaries from employees
 */
const extractSalaries = (employees: Employee[]): number[] => {
    return employees.map((employee) => employee.salary);
};

/**
 * Calculate average safely
 */
const calculateAverage = (values: number[]): number => {
    if (values.length === 0) return 0;

    const total = values.reduce((sum, val) => sum + val, 0);
    return total / values.length;
};

/**
 * Filters
 */
export const filterByCountry = (
    employees: Employee[],
    country: string
): Employee[] => {
    return employees.filter((employee) => employee.country === country);
};

export const filterByJobTitle = (
    employees: Employee[],
    jobTitle: string
): Employee[] => {
    return employees.filter((employee) => employee.jobTitle === jobTitle);
};

/**
 * Metrics: Country
 */
export const getCountryMetrics = (
    employees: Employee[]
): CountryMetrics | null => {
    if (employees.length === 0) return null;

    const salaries = extractSalaries(employees);

    return {
        min: Math.min(...salaries),
        max: Math.max(...salaries),
        average: calculateAverage(salaries),
    };
};

/**
 * Metrics: Job Title
 */
export const getJobTitleMetrics = (
    employees: Employee[]
): JobTitleMetrics | null => {
    if (employees.length === 0) return null;

    const salaries = extractSalaries(employees);

    return {
        average: calculateAverage(salaries),
    };
};