import { Request, Response } from 'express';
import { Profile } from '../entities';

export const addProfile = async (req: Request, res: Response) => {
    try {
        const { perfil } = req.body;
        if (!perfil) return res.status(203).json({ message: 'El perfil es requerido' });
        const profile = new Profile();
        profile.perfil = perfil;

        await profile.save();
        return res.status(200).json(profile);
    } catch (error) {
        return res.status(500).json({ message: (error as Error).message });
    }
};

export const getProfile = async (_req: Request, res: Response) => {
    try {
        const profiles = await Profile.find();
        return res.json(profiles);
    } catch (error) {
        return res.status(500).json({ message: (error as Error).message });
    }
};

export const updateProfile = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const profile = await Profile.findOneBy({ id_perfil: Number(id) });
        if (!profile) return res.status(203).json({ message: 'Profile no encontrado' });
        await Profile.update({ id_perfil: Number(id) }, req.body);
        return res.status(204).json({ message: 'success' });
    } catch (error) {
        return res.status(500).json({ message: (error as Error).message });
    }
};
