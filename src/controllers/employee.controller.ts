import { Request, Response } from 'express';
import {
    CreateEmployeePayload,
    CreateEmployeeResponse,
    Employee
} from '../types/employee';
import {
    createEmployeeRecord,
    deleteEmployeeRecord,
    findEmployeeById,
    getAllEmployees,
    resetEmployeeRecords,
    updateEmployeeRecord
} from '../services/employee.service';
import { validateEmployeePayload } from '../utils/validation';

export const createEmployee = (
    req: Request<{}, CreateEmployeeResponse, CreateEmployeePayload>,
    res: Response<CreateEmployeeResponse>
) => {
    const validationError = validateEmployeePayload(req.body);

    if (validationError) {
        return res.status(400).json({ message: validationError } as any);
    }

    const employee = createEmployeeRecord(req.body);

    res.status(201).json({
        id: employee.id,
        message: 'Employee created'
    });
};

export const getEmployees = (_req: Request, res: Response) => {
    res.status(200).json(getAllEmployees());
};

export const getEmployeeById = (
    req: Request<{ id: string }>,
    res: Response<Employee>
) => {
    const employeeId = Number(req.params.id);
    const employee = findEmployeeById(employeeId);

    if (!employee) {
        return res.sendStatus(404);
    }

    return res.status(200).json(employee);
};

export const updateEmployeeById = (
    req: Request<{ id: string }, Employee, CreateEmployeePayload>,
    res: Response<Employee>
) => {
    const employeeId = Number(req.params.id);
    const updatedEmployee = updateEmployeeRecord(employeeId, req.body);

    if (!updatedEmployee) {
        return res.sendStatus(404);
    }

    return res.status(200).json(updatedEmployee);
};

export const deleteEmployeeById = (
    req: Request<{ id: string }>,
    res: Response
) => {
    const employeeId = Number(req.params.id);
    const isDeleted = deleteEmployeeRecord(employeeId);

    if (!isDeleted) {
        return res.sendStatus(404);
    }

    return res.sendStatus(204);
};

export const resetEmployees = () => {
    resetEmployeeRecords();
};
