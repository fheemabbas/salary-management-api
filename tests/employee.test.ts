import request from 'supertest';
import app from '../src/app';

describe('Employee API', () => {
    it('should create a new employee', async () => {
        const newEmployee = {
            fullName: 'John Doe',
            jobTitle: 'Frontend Developer',
            country: 'India',
            salary: 50000
        };

        const response = await request(app)
            .post('/employees')
            .send(newEmployee);

        expect(response.status).toBe(201);
    });

    it('should return a list of employees', async () => {
        const newEmployee = {
            fullName: 'Jane Doe',
            jobTitle: 'Backend Developer',
            country: 'India',
            salary: 60000
        };

        await request(app)
            .post('/employees')
            .send(newEmployee);

        const response = await request(app).get('/employees');

        expect(response.status).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
        expect(response.body.length).toBeGreaterThanOrEqual(1);
    });

    it('should return a single employee by id', async () => {
        const newEmployee = {
            fullName: 'Alice Smith',
            jobTitle: 'QA Engineer',
            country: 'India',
            salary: 55000
        };

        await request(app)
            .post('/employees')
            .send(newEmployee);

        const response = await request(app).get('/employees/1');

        expect(response.status).toBe(200);
        expect(response.body).toBeDefined();
        expect(response.body.fullName).toBe(newEmployee.fullName);
    });

    it('should return 404 when employee is not found', async () => {
        const response = await request(app).get('/employees/9999');

        expect(response.status).toBe(404);
    });
});
