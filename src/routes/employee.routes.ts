import { Router } from 'express';
import { createEmployee } from '../controllers/employee.controller';

const employeeRouter = Router();

employeeRouter.post('/employees', createEmployee);

export default employeeRouter;
