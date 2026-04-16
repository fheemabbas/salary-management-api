import { Request, Response } from 'express';
import { findEmployeeById } from '../services/employee.service';
import { calculateSalary } from '../services/salary.service';
import { SalaryBreakdown } from '../types/employee';

export const getSalary = (
    req: Request<{ employeeId: string }, any, any, { gross_salary?: string }>,
    res: Response<SalaryBreakdown>
) => {
    const employeeId = Number(req.params.employeeId);
    const employee = findEmployeeById(employeeId);

    if (!employee) {
        return res.sendStatus(404);
    }

    const grossSalaryParam = req.query.gross_salary;
    let gross = employee.salary;

    if (grossSalaryParam !== undefined) {
        gross = Number(grossSalaryParam);
        if (isNaN(gross) || gross <= 0) {
            return res.status(400).json({ message: 'Invalid gross salary' } as any);
        }
    }

    const employeeForCalculation = {
        ...employee,
        salary: gross
    };

    return res.status(200).json(calculateSalary(employeeForCalculation));
};
