import { Request, Response } from 'express';
import { findEmployeeById } from '../services/employee.service';
import { calculateSalary } from '../services/salary.service';
import { SalaryBreakdown } from '../types/employee';

export const getSalary = (
    req: Request<{ employeeId: string }>,
    res: Response<SalaryBreakdown>
) => {
    const employeeId = Number(req.params.employeeId);
    const employee = findEmployeeById(employeeId);

    if (!employee) {
        return res.sendStatus(404);
    }

    return res.status(200).json(calculateSalary(employee));
};
