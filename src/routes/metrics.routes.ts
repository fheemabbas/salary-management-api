import { Router } from 'express';
import {
    getCountryMetrics,
    getJobTitleMetrics
} from '../controllers/metrics.controller';

const metricsRouter = Router();

/**
 * @swagger
 * tags:
 *   name: Metrics
 *   description: Salary statistical metrics
 */

/**
 * @swagger
 * /metrics/country/{country}:
 *   get:
 *     summary: Get salary metrics for a specific country
 *     tags: [Metrics]
 *     parameters:
 *       - in: path
 *         name: country
 *         required: true
 *         schema:
 *           type: string
 *         description: The country name
 *     responses:
 *       200:
 *         description: Country metrics retrieved
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CountryMetrics'
 *       404:
 *         description: No metrics found for this country
 */
metricsRouter.get('/metrics/country/:country', getCountryMetrics);

/**
 * @swagger
 * /metrics/job-title/{jobTitle}:
 *   get:
 *     summary: Get salary metrics for a specific job title
 *     tags: [Metrics]
 *     parameters:
 *       - in: path
 *         name: jobTitle
 *         required: true
 *         schema:
 *           type: string
 *         description: The job title
 *     responses:
 *       200:
 *         description: Job title metrics retrieved
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/JobTitleMetrics'
 *       404:
 *         description: No metrics found for this job title
 */
metricsRouter.get('/metrics/job-title/:jobTitle', getJobTitleMetrics);

export default metricsRouter;
