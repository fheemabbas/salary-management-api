import { Request, Response } from 'express';
import { CreateEmployeePayload, Employee } from '../types/employee';

const employees: Employee[] = [];
let nextEmployeeId = 1;

const buildEmployee = (payload: CreateEmployeePayload): Employee => {
    return {
        id: nextEmployeeId++,
        ...payload
    };
};

const findEmployeeIndexById = (employeeId: number): number => {
    return employees.findIndex((employee) => employee.id === employeeId);
};

const updateEmployee = (
    currentEmployee: Employee,
    payload: CreateEmployeePayload
): Employee => {
    return {
        ...currentEmployee,
        ...payload
    };
};

export const createEmployee = (
    req: Request<{}, { message: string }, CreateEmployeePayload>,
    res: Response<{ message: string }>
) => {
    const employee = buildEmployee(req.body);

    employees.push(employee);

    res.status(201).json({ message: 'Employee created' });
};

export const getEmployees = (_req: Request, res: Response) => {
    res.status(200).json(employees);
};

export const getEmployeeById = (
    req: Request<{ id: string }>,
    res: Response<Employee>
) => {
    const employeeId = Number(req.params.id);
    const employeeIndex = findEmployeeIndexById(employeeId);

    if (employeeIndex === -1) {
        return res.sendStatus(404);
    }

    return res.status(200).json(employees[employeeIndex]);
};

export const updateEmployeeById = (
    req: Request<{ id: string }, Employee, CreateEmployeePayload>,
    res: Response<Employee>
) => {
    const employeeId = Number(req.params.id);
    const employeeIndex = findEmployeeIndexById(employeeId);

    if (employeeIndex === -1) {
        return res.sendStatus(404);
    }

    const existingEmployee = employees[employeeIndex];
    const updatedEmployee = updateEmployee(existingEmployee, req.body);

    employees[employeeIndex] = updatedEmployee;

    return res.status(200).json(updatedEmployee);
};

export const deleteEmployeeById = (
    req: Request<{ id: string }>,
    res: Response<{ message: string }>
) => {
    const employeeId = Number(req.params.id);
    const employeeIndex = findEmployeeIndexById(employeeId);

    if (employeeIndex === -1) {
        return res.sendStatus(404);
    }

    employees.splice(employeeIndex, 1);

    return res.status(200).json({ message: 'Employee deleted' });
};

export const resetEmployees = () => {
    employees.length = 0;
    nextEmployeeId = 1;
};
