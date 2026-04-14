import { Router } from 'express';
import {
    createEmployee,
    getEmployeeById,
    getEmployees
} from '../controllers/employee.controller';

const employeeRouter = Router();

employeeRouter.post('/employees', createEmployee);
employeeRouter.get('/employees', getEmployees);
employeeRouter.get('/employees/:id', getEmployeeById);

export default employeeRouter;
