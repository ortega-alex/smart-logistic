import { Request, Response } from 'express';
import { getAll as getAllSedeService } from './headquarter.service';

export const getAll = async (req: Request, res: Response) => {
    try {
        const { filter } = req.params;
        const headquarters = await getAllSedeService(filter);
        return res.json(headquarters);
    } catch (error) {
        return res.status(500).json({ message: (error as Error).message });
    }
};
