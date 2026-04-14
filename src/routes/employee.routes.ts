import { Router } from 'express';
import {
    createEmployee,
    getEmployeeById,
    getEmployees,
    updateEmployeeById
} from '../controllers/employee.controller';

const employeeRouter = Router();

employeeRouter.post('/employees', createEmployee);
employeeRouter.get('/employees', getEmployees);
employeeRouter.get('/employees/:id', getEmployeeById);
employeeRouter.put('/employees/:id', updateEmployeeById);

export default employeeRouter;
