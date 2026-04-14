import express from 'express';
import employeeRouter from './routes/employee.routes';
import salaryRouter from './routes/salary.routes';

const app = express();

app.use(express.json());
app.use(employeeRouter);
app.use(salaryRouter);

export default app;
