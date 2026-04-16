import request from 'supertest';
import app from '../src/app';
import { resetEmployeeRecords } from '../src/services/employee.service';
import { CreateEmployeePayload, CreateEmployeeResponse } from '../src/types/employee';

describe('Salary API', () => {
    beforeEach(() => {
        resetEmployeeRecords();
    });

    const createEmployee = async (
        employee: CreateEmployeePayload
    ): Promise<CreateEmployeeResponse> => {
        const response = await request(app)
            .post('/employees')
            .send(employee);

        return response.body;
    };

    it('should return salary details for an employee in India', async () => {
        const employee = await createEmployee({
            fullName: 'Deepak Kumar',
            jobTitle: 'Software Engineer',
            country: 'India',
            salary: 50000
        });

        const response = await request(app).get(`/salary/${employee.id}`);

        expect(response.status).toBe(200);
        expect(response.body).toEqual({
            gross: 50000,
            tds: 5000,
            net: 45000,
        });
    });

    it('should return salary details for an employee in the United States', async () => {
        const employee = await createEmployee({
            fullName: 'Michael Johnson',
            jobTitle: 'Data Analyst',
            country: 'United States',
            salary: 50000
        });

        const response = await request(app).get(`/salary/${employee.id}`);

        expect(response.status).toBe(200);
        expect(response.body).toEqual({
            gross: 50000,
            tds: 6000,
            net: 44000,
        });
    });

    it('should return salary details with no deduction for other countries', async () => {
        const employee = await createEmployee({
            fullName: 'Liam Carter',
            jobTitle: 'Designer',
            country: 'Canada',
            salary: 50000
        });

        const response = await request(app).get(`/salary/${employee.id}`);

        expect(response.status).toBe(200);
        expect(response.body).toEqual({
            gross: 50000,
            tds: 0,
            net: 50000,
        });
    });

    it('should calculate salary using provided gross_salary', async () => {
        const employee = await createEmployee({
            fullName: 'Test User',
            jobTitle: 'Developer',
            country: 'India',
            salary: 50000
        });

        const response = await request(app)
            .get(`/salary/${employee.id}?gross_salary=60000`);

        expect(response.status).toBe(200);
        expect(response.body).toEqual({
            gross: 60000,
            tds: 6000,
            net: 54000
        });
    });

    it('should fallback to employee.salary if gross_salary not provided', async () => {
        const employee = await createEmployee({
            fullName: 'Test User',
            jobTitle: 'Developer',
            country: 'India',
            salary: 50000
        });

        const response = await request(app).get(`/salary/${employee.id}`);

        expect(response.status).toBe(200);
        expect(response.body).toEqual({
            gross: 50000,
            tds: 5000,
            net: 45000
        });
    });

    it('should return 400 if gross_salary is invalid (negative)', async () => {
        const employee = await createEmployee({
            fullName: 'Test User',
            jobTitle: 'Developer',
            country: 'India',
            salary: 50000
        });

        const response = await request(app)
            .get(`/salary/${employee.id}?gross_salary=-100`);

        expect(response.status).toBe(400);
    });

    it('should return 400 if gross_salary is invalid (zero)', async () => {
        const employee = await createEmployee({
            fullName: 'Test User',
            jobTitle: 'Developer',
            country: 'India',
            salary: 50000
        });

        const response = await request(app)
            .get(`/salary/${employee.id}?gross_salary=0`);

        expect(response.status).toBe(400);
    });

    it('should return 404 when salary is requested for a non-existent employee', async () => {
        const response = await request(app).get('/salary/9999');

        expect(response.status).toBe(404);
    });
});
