import { Request, Response } from 'express';
import { getAllEmployees } from '../services/employee.service';
import { CountryMetrics, Employee, JobTitleMetrics } from '../types/employee';

const getAverageSalary = (employees: Employee[]): number => {
    const totalSalary = employees.reduce(
        (sum, employee) => sum + employee.salary,
        0
    );

    return totalSalary / employees.length;
};

export const getCountryMetrics = (
    req: Request<{ country: string }>,
    res: Response<CountryMetrics>
) => {
    const { country } = req.params;
    const employees = getAllEmployees().filter(
        (employee) => employee.country === country
    );

    if (employees.length === 0) {
        return res.sendStatus(404);
    }

    const salaries = employees.map((employee) => employee.salary);

    return res.status(200).json({
        min: Math.min(...salaries),
        max: Math.max(...salaries),
        average: getAverageSalary(employees)
    });
};

export const getJobTitleMetrics = (
    req: Request<{ jobTitle: string }>,
    res: Response<JobTitleMetrics>
) => {
    const { jobTitle } = req.params;
    const employees = getAllEmployees().filter(
        (employee) => employee.jobTitle === jobTitle
    );

    if (employees.length === 0) {
        return res.sendStatus(404);
    }

    return res.status(200).json({
        average: getAverageSalary(employees)
    });
};
