import request from 'supertest';
import app from '../src/app';
import { resetEmployeeRecords } from '../src/services/employee.service';
import { CreateEmployeeResponse } from '../src/types/employee';

describe('Employee API', () => {
    beforeEach(() => {
        resetEmployeeRecords();
    });

    const createEmployee = async (
        employee: {
            fullName: string;
            jobTitle: string;
            country: string;
            salary: number;
        }
    ): Promise<CreateEmployeeResponse> => {
        const response = await request(app)
            .post('/employees')
            .send(employee);

        return response.body;
    };

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

    it('should return 400 when fullName is missing', async () => {
        const response = await request(app)
            .post('/employees')
            .send({
                jobTitle: 'Developer',
                country: 'India',
                salary: 50000
            });
        expect(response.status).toBe(400);
    });

    it('should return 400 when jobTitle is missing', async () => {
        const response = await request(app)
            .post('/employees')
            .send({
                fullName: 'Test User',
                country: 'India',
                salary: 50000
            });
        expect(response.status).toBe(400);
    });

    it('should return 400 when country is missing', async () => {
        const response = await request(app)
            .post('/employees')
            .send({
                fullName: 'Test User',
                jobTitle: 'Developer',
                salary: 50000
            });
        expect(response.status).toBe(400);
    });

    it('should return 400 when salary is missing', async () => {
        const response = await request(app)
            .post('/employees')
            .send({
                fullName: 'Test User',
                jobTitle: 'Developer',
                country: 'India'
            });
        expect(response.status).toBe(400);
    });

    it('should return 400 when salary is negative', async () => {
        const response = await request(app)
            .post('/employees')
            .send({
                fullName: 'Test User',
                jobTitle: 'Developer',
                country: 'India',
                salary: -100
            });
        expect(response.status).toBe(400);
    });

    it('should return 400 when salary is 0', async () => {
        const response = await request(app)
            .post('/employees')
            .send({
                fullName: 'Test User',
                jobTitle: 'Developer',
                country: 'India',
                salary: 0
            });
        expect(response.status).toBe(400);
    });

    it('should return 400 when fullName is empty', async () => {
        const response = await request(app)
            .post('/employees')
            .send({
                fullName: '',
                jobTitle: 'Developer',
                country: 'India',
                salary: 50000
            });
        expect(response.status).toBe(400);
    });

    it('should return 400 when jobTitle is empty', async () => {
        const response = await request(app)
            .post('/employees')
            .send({
                fullName: 'Test User',
                jobTitle: '',
                country: 'India',
                salary: 50000
            });
        expect(response.status).toBe(400);
    });

    it('should return 400 when country is empty', async () => {
        const response = await request(app)
            .post('/employees')
            .send({
                fullName: 'Test User',
                jobTitle: 'Developer',
                country: '',
                salary: 50000
            });
        expect(response.status).toBe(400);
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

        const createdEmployee = await createEmployee(newEmployee);

        const response = await request(app).get(
            `/employees/${createdEmployee.id}`
        );

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

        const createdEmployee = await createEmployee(newEmployee);

        const updatedEmployee = {
            fullName: 'Bob Wilson Updated',
            jobTitle: 'Senior DevOps Engineer',
            country: 'India',
            salary: 85000
        };

        const response = await request(app)
            .put(`/employees/${createdEmployee.id}`)
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

    it('should update only salary of an employee', async () => {
        const newEmployee = {
            fullName: 'Test User',
            jobTitle: 'Developer',
            country: 'India',
            salary: 50000
        };
        const createdEmployee = await createEmployee(newEmployee);

        const updateRes = await request(app)
            .put(`/employees/${createdEmployee.id}`)
            .send({ salary: 80000 });

        expect(updateRes.status).toBe(200);
        expect(updateRes.body.salary).toBe(80000);
        expect(updateRes.body.fullName).toBe('Test User');
    });

    it('should update only fullName of an employee', async () => {
        const newEmployee = {
            fullName: 'Test User',
            jobTitle: 'Developer',
            country: 'India',
            salary: 50000
        };
        const createdEmployee = await createEmployee(newEmployee);

        const updateRes = await request(app)
            .put(`/employees/${createdEmployee.id}`)
            .send({ fullName: 'Updated Name' });

        expect(updateRes.status).toBe(200);
        expect(updateRes.body.fullName).toBe('Updated Name');
        expect(updateRes.body.jobTitle).toBe('Developer');
    });

    it('should update only jobTitle of an employee', async () => {
        const newEmployee = {
            fullName: 'Test User',
            jobTitle: 'Developer',
            country: 'India',
            salary: 50000
        };
        const createdEmployee = await createEmployee(newEmployee);

        const updateRes = await request(app)
            .put(`/employees/${createdEmployee.id}`)
            .send({ jobTitle: 'Senior Developer' });

        expect(updateRes.status).toBe(200);
        expect(updateRes.body.jobTitle).toBe('Senior Developer');
        expect(updateRes.body.country).toBe('India');
    });

    it('should update only country of an employee', async () => {
        const newEmployee = {
            fullName: 'Test User',
            jobTitle: 'Developer',
            country: 'India',
            salary: 50000
        };
        const createdEmployee = await createEmployee(newEmployee);

        const updateRes = await request(app)
            .put(`/employees/${createdEmployee.id}`)
            .send({ country: 'USA' });

        expect(updateRes.status).toBe(200);
        expect(updateRes.body.country).toBe('USA');
        expect(updateRes.body.salary).toBe(50000);
    });

    it('should delete an employee by id', async () => {
        const newEmployee = {
            fullName: 'Charlie Brown',
            jobTitle: 'Product Manager',
            country: 'India',
            salary: 90000
        };

        const createdEmployee = await createEmployee(newEmployee);

        const deleteResponse = await request(app).delete(
            `/employees/${createdEmployee.id}`
        );

        expect([200, 204]).toContain(deleteResponse.status);

        const getResponse = await request(app).get(
            `/employees/${createdEmployee.id}`
        );

        expect(getResponse.status).toBe(404);
    });

    it('should return 404 when deleting a non-existent employee', async () => {
        const response = await request(app).delete('/employees/9999');

        expect(response.status).toBe(404);
    });
});
