import { Request, Response } from 'express';
import { Menu } from '../entities';

export const getMenus = async (req: Request, res: Response) => {
    try {
        const menus = await Menu.find();
        return res.json(menus);
    } catch (error) {
        return res.status(500).json({ message: (error as Error).message });
    }
};
