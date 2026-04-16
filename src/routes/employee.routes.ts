import { Router } from 'express';
import {
    createEmployee,
    deleteEmployeeById,
    getEmployeeById,
    getEmployees,
    updateEmployeeById
} from '../controllers/employee.controller';

const employeeRouter = Router();

/**
 * @swagger
 * tags:
 *   name: Employees
 *   description: Employee management
 */

/**
 * @swagger
 * /employees:
 *   post:
 *     summary: Create a new employee
 *     description: Validates and securely creates a new employee profile in the system.
 *     tags: [Employees]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateEmployeePayload'
 *     responses:
 *       201:
 *         description: Employee created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Employee created
 *                 id:
 *                   type: integer
 *                   example: 1
 *       400:
 *         description: Invalid input, object invalid
 */
employeeRouter.post('/employees', createEmployee);

/**
 * @swagger
 * /employees:
 *   get:
 *     summary: Retrieve a list of all employees
 *     tags: [Employees]
 *     responses:
 *       200:
 *         description: A list of employees
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Employee'
 */
employeeRouter.get('/employees', getEmployees);

/**
 * @swagger
 * /employees/{id}:
 *   get:
 *     summary: Retrieve an employee by ID
 *     tags: [Employees]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The unique ID of the employee
 *     responses:
 *       200:
 *         description: Successfully retrieved employee details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Employee'
 *       404:
 *         description: Employee not found
 */
employeeRouter.get('/employees/:id', getEmployeeById);

/**
 * @swagger
 * /employees/{id}:
 *   put:
 *     summary: Update an employee by ID
 *     description: Updates only provided fields of an employee
 *     tags: [Employees]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The unique ID of the employee
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateEmployeePayload'
 *           example:
 *             salary: 80000
 *     responses:
 *       200:
 *         description: Employee updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Employee'
 *       400:
 *         description: Invalid partial field payload
 *       404:
 *         description: Employee not found
 */
employeeRouter.put('/employees/:id', updateEmployeeById);

/**
 * @swagger
 * /employees/{id}:
 *   delete:
 *     summary: Delete an employee by ID
 *     tags: [Employees]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The unique ID of the employee
 *     responses:
 *       204:
 *         description: Employee deleted successfully
 *       404:
 *         description: Employee not found
 */
employeeRouter.delete('/employees/:id', deleteEmployeeById);

export default employeeRouter;
