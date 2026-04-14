import { Request, Response } from 'express';
import { getAllEmployees } from '../services/employee.service';
import {
    filterByCountry,
    filterByJobTitle,
    getCountryMetrics as calculateCountryMetrics,
    getJobTitleMetrics as calculateJobTitleMetrics,
} from '../services/metrics.service';
import { CountryMetrics, JobTitleMetrics } from '../types/employee';

/**
 * GET /metrics/country/:country
 */
export const getCountryMetrics = (
    req: Request<{ country: string }>,
    res: Response<CountryMetrics>
) => {
    const { country } = req.params;

    const allEmployees = getAllEmployees();
    const employees = filterByCountry(allEmployees, country);

    const metrics = calculateCountryMetrics(employees);

    if (!metrics) {
        return res.sendStatus(404);
    }

    return res.status(200).json(metrics);
};

/**
 * GET /metrics/job-title/:jobTitle
 */
export const getJobTitleMetrics = (
    req: Request<{ jobTitle: string }>,
    res: Response<JobTitleMetrics>
) => {
    const { jobTitle } = req.params;

    const allEmployees = getAllEmployees();
    const employees = filterByJobTitle(allEmployees, jobTitle);

    const metrics = calculateJobTitleMetrics(employees);

    if (!metrics) {
        return res.sendStatus(404);
    }

    return res.status(200).json(metrics);
};