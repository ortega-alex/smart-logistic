import { Request, Response } from 'express';
import { ImportState } from '../entities';

export const getImportState = async (req: Request, res: Response) => {
    try {
        const import_states = await ImportState.find({
            where: { estado: true },
            order: { index: 'ASC' }
        });
        res.status(200).json(import_states);
    } catch (error) {
        return res.status(500).json({ message: (error as Error).message });
    }
};
