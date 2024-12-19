import { Request, Response } from 'express';
import { Permission, ProfileMenuPermission } from '../entities';

export const getPermission = async (_req: Request, res: Response) => {
    try {
        const permissions = await Permission.find();
        return res.json(permissions);
    } catch (error) {
        return res.status(500).json({ message: (error as Error).message });
    }
};

export const getPermissionMenuByProfileId = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        // const permissions = await ProfileMenuPermission.getRepository()
        //     .createQueryBuilder('perfil_memu_permiso')
        //     .innerJoinAndSelect('perfil_memu_permiso.menu', 'menu')
        //     .innerJoinAndSelect('perfil_memu_permiso.permiso', 'permiso')
        //     .where('perfil_memu_permiso.id_perfil = :id', { id: Number(id) })
        //     .getMany();
        const permissions = await ProfileMenuPermission.find({
            relations: {
                menu: true,
                permiso: true
            },
            where: {
                perfil: {
                    id_perfil: Number(id)
                }
            },
            order: {
                menu: {
                    menu: 'ASC'
                }
            }
        });
        return res.json(permissions);
    } catch (error) {
        return res.status(500).json({ message: (error as Error).message });
    }
};
