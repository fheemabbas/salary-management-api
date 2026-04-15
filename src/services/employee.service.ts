import db from '../config/db';
import { CreateEmployeePayload, Employee } from '../types/employee';

const insertEmployeeStatement = db.prepare(`
    INSERT INTO employees (fullName, jobTitle, country, salary)
    VALUES (@fullName, @jobTitle, @country, @salary)
`);

const selectAllEmployeesStatement = db.prepare(`
    SELECT id, fullName, jobTitle, country, salary
    FROM employees
`);

const selectEmployeeByIdStatement = db.prepare(`
    SELECT id, fullName, jobTitle, country, salary
    FROM employees
    WHERE id = ?
`);

const updateEmployeeStatement = db.prepare(`
    UPDATE employees
    SET fullName = @fullName,
        jobTitle = @jobTitle,
        country = @country,
        salary = @salary
    WHERE id = @id
`);

const deleteEmployeeStatement = db.prepare(`
    DELETE FROM employees
    WHERE id = ?
`);

const deleteAllEmployeesStatement = db.prepare(`
    DELETE FROM employees
`);

export const createEmployeeRecord = (
    payload: CreateEmployeePayload
): Employee => {
    const result = insertEmployeeStatement.run(payload);

    return {
        id: Number(result.lastInsertRowid),
        ...payload
    };
};

export const getAllEmployees = (): Employee[] => {
    return selectAllEmployeesStatement.all() as Employee[];
};

export const findEmployeeById = (
    employeeId: number
): Employee | undefined => {
    return selectEmployeeByIdStatement.get(employeeId) as Employee | undefined;
};

export const updateEmployeeRecord = (
    employeeId: number,
    payload: CreateEmployeePayload
): Employee | undefined => {
    const existingEmployee = findEmployeeById(employeeId);

    if (!existingEmployee) {
        return undefined;
    }

    const updatedEmployee: Employee = {
        id: existingEmployee.id,
        ...payload
    };

    updateEmployeeStatement.run(updatedEmployee);

    return updatedEmployee;
};

export const deleteEmployeeRecord = (
    employeeId: number
): boolean => {
    const result = deleteEmployeeStatement.run(employeeId);

    return result.changes > 0;
};

export const resetEmployeeRecords = (): void => {
    deleteAllEmployeesStatement.run();
    // Reset AUTOINCREMENT counter so IDs restart from 1
    db.prepare(`DELETE FROM sqlite_sequence WHERE name = 'employees'`).run();
};
