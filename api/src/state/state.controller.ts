import { Request, Response } from 'express';
import StateService from './state.service';

export const getAll = async (_req: Request, res: Response) => {
    try {
        const states = await StateService.getAll();
        return res.json(states);
    } catch (error) {
        return res.status(500).json({ message: (error as Error).message });
    }
};

export const getById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const state = await StateService.getById(Number(id));
        if (!state) return res.status(203).json({ message: 'No se encontro el estado' });
        return res.json(state);
    } catch (error) {
        return res.status(500).json({ message: (error as Error).message });
    }
};

export default {
    getAll,
    getById
};
