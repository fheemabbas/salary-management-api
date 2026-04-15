import cors from 'cors';
import express from 'express';
import swaggerUi from 'swagger-ui-express';
import { swaggerSpec } from './config/swagger';
import { runMigrations } from './config/migrate';
import employeeRouter from './routes/employee.routes';
import metricsRouter from './routes/metrics.routes';
import salaryRouter from './routes/salary.routes';

runMigrations();

const app = express();

app.use(cors());
app.use(express.json());

// Setup Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use(employeeRouter);
app.use(metricsRouter);
app.use(salaryRouter);

export default app;
