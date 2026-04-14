import { Request, Response } from 'express';

type Employee = {
    id: number;
    fullName: string;
    jobTitle: string;
    country: string;
    salary: number;
};

const employees: Employee[] = [];
let nextEmployeeId = 1;

export const createEmployee = (req: Request, res: Response) => {
    const employee: Employee = {
        id: nextEmployeeId++,
        ...req.body
    };

    employees.push(employee);

    res.status(201).json({ message: 'Employee created' });
};

export const getEmployees = (_req: Request, res: Response) => {
    res.status(200).json(employees);
};

export const getEmployeeById = (req: Request, res: Response) => {
    const employeeId = Number(req.params.id);
    const employee = employees.find(({ id }) => id === employeeId);

    if (!employee) {
        return res.sendStatus(404);
    }

    return res.status(200).json(employee);
};

export const resetEmployees = () => {
    employees.length = 0;
    nextEmployeeId = 1;
};
