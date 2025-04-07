import { Request, Response } from 'express';
import DepartmentService from './department.service';

export const getAll = async (req: Request, res: Response) => {
    try {
        const departments = await DepartmentService.getAll();
        return res.json(departments);
    } catch (error) {
        return res.status(500).json({ message: (error as Error).message });
    }
};

export default {
    getAll
};
