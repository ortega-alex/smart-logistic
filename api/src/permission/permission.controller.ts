import { Request, Response } from 'express';
import { getAll as getAllPermissionService } from './permission.service';

export const getAll = async (_req: Request, res: Response) => {
    try {
        const permissions = await getAllPermissionService();
        return res.json(permissions);
    } catch (error) {
        return res.status(500).json({ message: (error as Error).message });
    }
};
