import { Router } from 'express';
import {
    getCountryMetrics,
    getJobTitleMetrics
} from '../controllers/metrics.controller';

const metricsRouter = Router();

metricsRouter.get('/metrics/country/:country', getCountryMetrics);
metricsRouter.get('/metrics/job-title/:jobTitle', getJobTitleMetrics);

export default metricsRouter;
