import { CreateEmployeePayload, Employee } from '../types/employee';

const employees: Employee[] = [];
let nextEmployeeId = 1;

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

export const createEmployeeRecord = (
    payload: CreateEmployeePayload
): Employee => {
    const employee: Employee = {
        id: nextEmployeeId++,
        ...payload
    };

    employees.push(employee);

    return employee;
};

export const getAllEmployees = (): Employee[] => {
    return employees;
};

export const findEmployeeById = (
    employeeId: number
): Employee | undefined => {
    const employeeIndex = findEmployeeIndexById(employeeId);

    if (employeeIndex === -1) {
        return undefined;
    }

    return employees[employeeIndex];
};

export const updateEmployeeRecord = (
    employeeId: number,
    payload: CreateEmployeePayload
): Employee | undefined => {
    const employeeIndex = findEmployeeIndexById(employeeId);

    if (employeeIndex === -1) {
        return undefined;
    }

    const existingEmployee = employees[employeeIndex];
    const updatedEmployee = updateEmployee(existingEmployee, payload);

    employees[employeeIndex] = updatedEmployee;

    return updatedEmployee;
};

export const deleteEmployeeRecord = (
    employeeId: number
): boolean => {
    const employeeIndex = findEmployeeIndexById(employeeId);

    if (employeeIndex === -1) {
        return false;
    }

    employees.splice(employeeIndex, 1);

    return true;
};

export const resetEmployeeRecords = (): void => {
    employees.length = 0;
    nextEmployeeId = 1;
};
