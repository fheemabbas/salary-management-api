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
});
