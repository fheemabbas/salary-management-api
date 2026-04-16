import { Router } from 'express';
import { getSalary } from '../controllers/salary.controller';

const salaryRouter = Router();

/**
 * @swagger
 * tags:
 *   name: Salary
 *   description: Salary breakdown operations
 */

/**
 * @swagger
 * /salary/{employeeId}:
 *   get:
 *     summary: Get salary breakdown for an employee
 *     description: Computes the gross, TDS, and net salary. A gross_salary parameter can optionally override the DB value.
 *     tags: [Salary]
 *     parameters:
 *       - in: path
 *         name: employeeId
 *         required: true
 *         schema:
 *           type: integer
 *           example: 1
 *         description: The unique ID of the employee
 *       - in: query
 *         name: gross_salary
 *         required: false
 *         schema:
 *           type: number
 *           example: 60000
 *         description: Optional gross salary override
 *     responses:
 *       200:
 *         description: Salary breakdown retrieved
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SalaryBreakdown'
 *             example:
 *               gross: 60000
 *               tds: 6000
 *               net: 54000
 *       400:
 *         description: Invalid gross salary
 *       404:
 *         description: Employee not found
 */
salaryRouter.get('/salary/:employeeId', getSalary);

export default salaryRouter;
