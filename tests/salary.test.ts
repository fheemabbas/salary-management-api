import request from 'supertest';
import app from '../src/app';
import { resetEmployees } from '../src/controllers/employee.controller';

describe('Salary API', () => {
    beforeEach(() => {
        resetEmployees();
    });

    const createEmployee = async (employee: any) => {
        const response = await request(app)
            .post('/employees')
            .send(employee);

        return response.body; // assuming API returns created employee (with id)
    };

    it('should return salary details for an employee in India', async () => {
        const employee = await createEmployee({
            fullName: 'Deepak Kumar',
            jobTitle: 'Software Engineer',
            country: 'India',
            salary: 50000,
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
            salary: 50000,
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
            salary: 50000,
        });

        const response = await request(app).get(`/salary/${employee.id}`);

        expect(response.status).toBe(200);
        expect(response.body).toEqual({
            gross: 50000,
            tds: 0,
            net: 50000,
        });
    });

    it('should return 404 when salary is requested for a non-existent employee', async () => {
        const response = await request(app).get('/salary/9999');

        expect(response.status).toBe(404);
    });
});