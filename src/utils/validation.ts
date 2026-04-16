import { CreateEmployeePayload } from '../types/employee';

/**
 * Validates the payload for creating or updating an employee.
 * Returns an error message if invalid, or null if valid.
 */
export const validateEmployeePayload = (payload: Partial<CreateEmployeePayload>): string | null => {
    const { fullName, jobTitle, country, salary } = payload;

    if (!fullName || typeof fullName !== 'string' || fullName.trim() === '') {
        return 'fullName is required and must be a non-empty string';
    }
    if (!jobTitle || typeof jobTitle !== 'string' || jobTitle.trim() === '') {
        return 'jobTitle is required and must be a non-empty string';
    }
    if (!country || typeof country !== 'string' || country.trim() === '') {
        return 'country is required and must be a non-empty string';
    }
    if (salary === undefined || typeof salary !== 'number' || salary <= 0) {
        return 'salary is required and must be a number greater than 0';
    }

    return null;
};
