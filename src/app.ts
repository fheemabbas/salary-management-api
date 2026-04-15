import express from 'express';
import { runMigrations } from './config/migrate';
import employeeRouter from './routes/employee.routes';
import metricsRouter from './routes/metrics.routes';
import salaryRouter from './routes/salary.routes';

runMigrations();

const app = express();

app.use(express.json());
app.use(employeeRouter);
app.use(metricsRouter);
app.use(salaryRouter);

export default app;
