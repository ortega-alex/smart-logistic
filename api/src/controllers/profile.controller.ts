import { Request, Response } from 'express';
import { Menu, Permission, Profile, ProfileMenuPermission } from '../entities';

const addPermissions = async (perfil: any, permisos: { [key: string]: [string] }) => {
    await Object.keys(permisos).forEach(async id_menu => {
        const menu = await Menu.findOneBy({ id_menu: Number(id_menu) });
        permisos[id_menu].forEach(async (id_permiso: string) => {
            const permiso = await Permission.findOneBy({ id_permiso: Number(id_permiso) });
            if (permisos && menu && permiso) {
                const profileMenusPermission = new ProfileMenuPermission();
                profileMenusPermission.perfil = perfil;
                profileMenusPermission.permiso = permiso;
                profileMenusPermission.menu = menu;
                await profileMenusPermission.save();
            }
        });
    });
};

export const getProfile = async (_req: Request, res: Response) => {
    try {
        const profiles = await Profile.find();
        return res.json(profiles);
    } catch (error) {
        return res.status(500).json({ message: (error as Error).message });
    }
};

export const addProfile = async (req: Request, res: Response) => {
    try {
        const { perfil, _permisos } = req.body;
        if (!perfil) return res.status(203).json({ message: 'El perfil es requerido' });

        const profile = new Profile();
        profile.perfil = perfil;
        await profile.save();

        if (_permisos) await addPermissions(perfil, _permisos);

        return res.status(200).json(profile);
    } catch (error) {
        return res.status(500).json({ message: (error as Error).message });
    }
};

export const updateProfile = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { perfil, estado, _permisos } = req.body;
        const profile = await Profile.findOneBy({ id_perfil: Number(id) });
        if (!profile) return res.status(203).json({ message: 'Profile no encontrado' });
        await Profile.update(
            { id_perfil: Number(id) },
            {
                perfil: perfil ?? profile.perfil,
                estado: estado ?? profile.estado
            }
        );

        if (_permisos) {
            await ProfileMenuPermission.delete({ perfil: { id_perfil: Number(id) } });
            await addPermissions(profile, _permisos);
        }

        return res.json(profile);
    } catch (error) {
        return res.status(500).json({ message: (error as Error).message });
    }
};
