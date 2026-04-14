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
});
