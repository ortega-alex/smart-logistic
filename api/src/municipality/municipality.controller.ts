import { Request, Response } from 'express';
import { getAll as getAllMunicipalityService } from './municipality.service';

export const getAll = async (_req: Request, res: Response) => {
    try {
        const municipalities = await getAllMunicipalityService();
        return res.json(municipalities);
    } catch (error) {
        return res.status(500).json({ message: (error as Error).message });
    }
};
