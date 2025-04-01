import { Request, Response } from 'express';
import {
    addPermissions as addPermissionMenuPermissionProfileService,
    deleteByProfileId as deleteMenuPermissionProfileByIdProfileService
} from '../menu-permission-profile/menu-permission-profile.service';
import {
    getAll as getAllProfileService,
    getById as getProfileByIdService,
    save as saveProfileService,
    update as updateProfileService
} from './profile.service';

export const getAll = async (_req: Request, res: Response) => {
    try {
        const profiles = await getAllProfileService();
        return res.json(profiles);
    } catch (error) {
        return res.status(500).json({ message: (error as Error).message });
    }
};

export const add = async (req: Request, res: Response) => {
    try {
        const { name, permissions } = req.body;
        if (!name) return res.status(203).json({ message: 'El nombre del perfil es requerido' });

        const profile = await saveProfileService({ name });
        if (permissions) await addPermissionMenuPermissionProfileService(profile, permissions);

        return res.status(200).json(profile);
    } catch (error) {
        return res.status(500).json({ message: (error as Error).message });
    }
};

export const update = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { name, is_active, permissions } = req.body;
        const profile = await getProfileByIdService(Number(id));
        if (!profile) return res.status(203).json({ message: 'Perfil no encontrado' });
        const update = await updateProfileService(Number(id), { name, is_active }, profile);

        if (permissions) {
            await deleteMenuPermissionProfileByIdProfileService(Number(id));
            await addPermissionMenuPermissionProfileService(profile, permissions);
        }

        if (update.affected === 0) return res.status(203).json({ message: 'No se pudo actualizar el perfil' });
        return res.json(profile);
    } catch (error) {
        return res.status(500).json({ message: (error as Error).message });
    }
};
