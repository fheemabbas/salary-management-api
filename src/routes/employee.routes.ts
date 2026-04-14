import { Router } from 'express';
import { createEmployee, getEmployees } from '../controllers/employee.controller';

const employeeRouter = Router();

employeeRouter.post('/employees', createEmployee);
employeeRouter.get('/employees', getEmployees);

export default employeeRouter;
