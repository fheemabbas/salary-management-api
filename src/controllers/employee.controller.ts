import { Request, Response } from 'express';

const employees: unknown[] = [];

export const createEmployee = (req: Request, res: Response) => {
    employees.push(req.body);

    res.status(201).json({ message: 'Employee created' });
};

export const getEmployees = (_req: Request, res: Response) => {
    res.status(200).json(employees);
};
