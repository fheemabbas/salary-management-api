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
 *     tags: [Salary]
 *     parameters:
 *       - in: path
 *         name: employeeId
 *         required: true
 *         schema:
 *           type: integer
 *           example: 1
 *         description: The unique ID of the employee
 *     responses:
 *       200:
 *         description: Salary breakdown retrieved
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SalaryBreakdown'
 *             example:
 *               gross: 50000
 *               tds: 5000
 *               net: 45000
 *       404:
 *         description: Employee not found
 */
salaryRouter.get('/salary/:employeeId', getSalary);

export default salaryRouter;
