import { Request, Response } from 'express';
import { getAll as getAllStateService, getById as getByIdStateService } from './state.service';

export const getAll = async (_req: Request, res: Response) => {
    try {
        const states = await getAllStateService();
        return res.json(states);
    } catch (error) {
        return res.status(500).json({ message: (error as Error).message });
    }
};

export const getById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const state = await getByIdStateService(Number(id));
        if (!state) return res.status(203).json({ message: 'No se encontro el estado' });
        return res.json(state);
    } catch (error) {
        return res.status(500).json({ message: (error as Error).message });
    }
};
