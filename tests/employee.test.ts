import request from 'supertest';
import app from '../src/app';
import { resetEmployees } from '../src/controllers/employee.controller';

describe('Employee API', () => {
    beforeEach(() => {
        resetEmployees();
    });

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

    it('should update an employee by id', async () => {
        const newEmployee = {
            fullName: 'Bob Wilson',
            jobTitle: 'DevOps Engineer',
            country: 'India',
            salary: 70000
        };

        await request(app)
            .post('/employees')
            .send(newEmployee);

        const updatedEmployee = {
            fullName: 'Bob Wilson Updated',
            jobTitle: 'Senior DevOps Engineer',
            country: 'India',
            salary: 85000
        };

        const response = await request(app)
            .put('/employees/1')
            .send(updatedEmployee);

        expect(response.status).toBe(200);
        expect(response.body.fullName).toBe(updatedEmployee.fullName);
        expect(response.body.jobTitle).toBe(updatedEmployee.jobTitle);
        expect(response.body.salary).toBe(updatedEmployee.salary);
    });

    it('should return 404 when updating a non-existent employee', async () => {
        const updatedEmployee = {
            fullName: 'Missing Employee',
            jobTitle: 'Unknown',
            country: 'India',
            salary: 10000
        };

        const response = await request(app)
            .put('/employees/9999')
            .send(updatedEmployee);

        expect(response.status).toBe(404);
    });

    it('should delete an employee by id', async () => {
        const newEmployee = {
            fullName: 'Charlie Brown',
            jobTitle: 'Product Manager',
            country: 'India',
            salary: 90000
        };

        await request(app)
            .post('/employees')
            .send(newEmployee);

        const deleteResponse = await request(app).delete('/employees/1');

        expect([200, 204]).toContain(deleteResponse.status);

        const getResponse = await request(app).get('/employees/1');

        expect(getResponse.status).toBe(404);
    });

    it('should return 404 when deleting a non-existent employee', async () => {
        const response = await request(app).delete('/employees/9999');

        expect(response.status).toBe(404);
    });
});
