import { Request, Response } from 'express';
import { getAll as getMenuService } from './menu.service';

export const getAll = async (_req: Request, res: Response) => {
    try {
        const menus = await getMenuService();
        return res.json(menus);
    } catch (error) {
        return res.status(500).json({ message: (error as Error).message });
    }
};

export default {
    getAll
};
