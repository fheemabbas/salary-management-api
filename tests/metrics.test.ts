import request from 'supertest';
import app from '../src/app';
import { resetEmployees } from '../src/controllers/employee.controller';
import { CreateEmployeePayload } from '../src/types/employee';

describe('Metrics API', () => {
    beforeEach(() => {
        resetEmployees();
    });

    const createEmployee = async (
        employee: CreateEmployeePayload
    ): Promise<void> => {
        await request(app)
            .post('/employees')
            .send(employee);
    };

    it('should return salary metrics for a country', async () => {
        await createEmployee({
            fullName: 'Deepak Kumar',
            jobTitle: 'Software Engineer',
            country: 'India',
            salary: 50000
        });

        await createEmployee({
            fullName: 'Anita Sharma',
            jobTitle: 'QA Engineer',
            country: 'India',
            salary: 70000
        });

        const response = await request(app).get('/metrics/country/India');

        expect(response.status).toBe(200);
        expect(response.body).toEqual({
            min: 50000,
            max: 70000,
            average: 60000
        });
    });

    it('should return average salary metrics for a job title', async () => {
        await createEmployee({
            fullName: 'Deepak Kumar',
            jobTitle: 'Software Engineer',
            country: 'India',
            salary: 50000
        });

        await createEmployee({
            fullName: 'Michael Johnson',
            jobTitle: 'Software Engineer',
            country: 'United States',
            salary: 70000
        });

        const response = await request(app).get(
            '/metrics/job-title/Software Engineer'
        );

        expect(response.status).toBe(200);
        expect(response.body).toEqual({
            average: 60000
        });
    });

    it('should return 404 when no employees are found for a country', async () => {
        const response = await request(app).get('/metrics/country/Unknown');

        expect(response.status).toBe(404);
    });
});
