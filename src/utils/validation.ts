import { CreateEmployeePayload } from '../types/employee';

/**
 * Validates the payload for creating or updating an employee.
 * Returns an error message if invalid, or null if valid.
 */
export const validateEmployeePayload = (
    payload: Partial<CreateEmployeePayload>,
    isUpdate = false
): string | null => {
    const { fullName, jobTitle, country, salary } = payload;

    if (!isUpdate || fullName !== undefined) {
        if (!fullName || typeof fullName !== 'string' || fullName.trim() === '') {
            return 'fullName is required and must be a non-empty string';
        }
    }

    if (!isUpdate || jobTitle !== undefined) {
        if (!jobTitle || typeof jobTitle !== 'string' || jobTitle.trim() === '') {
            return 'jobTitle is required and must be a non-empty string';
        }
    }

    if (!isUpdate || country !== undefined) {
        if (!country || typeof country !== 'string' || country.trim() === '') {
            return 'country is required and must be a non-empty string';
        }
    }

    if (!isUpdate || salary !== undefined) {
        if (salary === undefined || typeof salary !== 'number' || salary <= 0) {
            return 'salary is required and must be a number greater than 0';
        }
    }

    return null;
};
