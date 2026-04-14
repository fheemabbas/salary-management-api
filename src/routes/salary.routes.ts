import { Router } from 'express';
import { getSalary } from '../controllers/salary.controller';

const salaryRouter = Router();

salaryRouter.get('/salary/:employeeId', getSalary);

export default salaryRouter;
