import { Request, Response } from 'express';
import MenuPermissionProfileService from '../menu-permission-profile/menu-permission-profile.service';
import ProfileService from './profile.service';

export const getAll = async (_req: Request, res: Response) => {
    try {
        const profiles = await ProfileService.getAll();
        return res.json(profiles);
    } catch (error) {
        return res.status(500).json({ message: (error as Error).message });
    }
};

export const getRoles = async (_req: Request, res: Response) => {
    try {
        const roles = await ProfileService.getRoles();
        return res.json(roles);
    } catch (error) {
        return res.status(500).json({ message: (error as Error).message });
    }
};

export const add = async (req: Request, res: Response) => {
    try {
        const { name, permissions, role_id } = req.body;
        if (!name) return res.status(203).json({ message: 'El nombre del perfil es requerido' });
        if (!role_id) return res.status(203).json({ message: 'El rol del perfil es requerido' });

        const role = await ProfileService.getRoleById(Number(role_id));
        if (!role) return res.status(203).json({ message: 'El rol del perfil es invalido' });

        const profile = await ProfileService.add({ name, role });
        if (permissions) await MenuPermissionProfileService.addPermissions(profile, permissions);

        return res.status(200).json({
            message: 'Perfil agregado correctamente',
            success: true
        });
    } catch (error) {
        return res.status(500).json({ message: (error as Error).message });
    }
};

export const update = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { name, is_active, permissions, role_id } = req.body;

        const profile = await ProfileService.getById(Number(id));
        if (!profile) return res.status(203).json({ message: 'Perfil no encontrado' });

        let role;
        if (role_id) role = await ProfileService.getRoleById(Number(role_id));

        const update = await ProfileService.update(Number(id), {
            name: name ?? profile.name,
            is_active: is_active ?? profile.is_active,
            role: role ?? profile.role
        });

        if (permissions) {
            await MenuPermissionProfileService.deleteByProfileId(Number(id));
            await MenuPermissionProfileService.addPermissions(profile, permissions);
        }

        if (update.affected === 0) return res.status(203).json({ message: 'No se pudo actualizar el perfil' });
        return res.json({ message: 'Perfil actualizado correctamente', success: true });
    } catch (error) {
        return res.status(500).json({ message: (error as Error).message });
    }
};

export default {
    getAll,
    getRoles,
    add,
    update
};
