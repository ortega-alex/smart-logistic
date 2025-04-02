import { Request, Response } from 'express';
import { getAll as getAllDepartmentService } from './department.service';

export const getAll = async (req: Request, res: Response) => {
    try {
        const departments = await getAllDepartmentService();
        return res.json(departments);
    } catch (error) {
        return res.status(500).json({ message: (error as Error).message });
    }
};
