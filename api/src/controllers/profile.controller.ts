import { Request, Response } from 'express';
import { Perfil } from '../entities';

export const addProfile = async (req: Request, res: Response) => {
    try {
        const { perfil } = req.body;
        if (!perfil) return res.status(203).json({ message: 'El perfil es requerido' });
        const profile = new Perfil();
        profile.perfil = perfil;

        await profile.save();
        return res.status(200).json(profile);
    } catch (error) {
        return res.status(500).json({ message: (error as Error).message });
    }
};
