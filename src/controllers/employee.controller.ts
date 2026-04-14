import { Request, Response } from 'express';

export const createEmployee = (_req: Request, res: Response) => {
    res.status(201).json({ message: 'Employee created' });
};
