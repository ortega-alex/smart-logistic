import { MenuPermissionProfile } from './entity/MenuPermissionProfile';
import { getById as getMenuByIdService } from '../menu/menu.service';
import { getById as getPermissionByIdService } from '../permission/permission.service';

export const getByProfileId = async (id: number) =>
    await MenuPermissionProfile.find({
        relations: {
            menu: true,
            permission: true
        },
        where: {
            profile: {
                id: Number(id)
            },
            menu: {
                is_active: true
            }
        },
        order: {
            menu: {
                name: 'ASC'
            }
        }
    });

export const addPermissions = async (profile: any, permissions: { [key: string]: [string] }) => {
    await Object.keys(permissions).forEach(async menu_id => {
        const menu = await getMenuByIdService(Number(menu_id));
        permissions[menu_id].forEach(async (permission_id: string) => {
            const permiso = await getPermissionByIdService(Number(permission_id));
            if (permissions && menu && permiso) {
                const menuPermissionProfile = new MenuPermissionProfile();
                menuPermissionProfile.profile = profile;
                menuPermissionProfile.permission = permiso;
                menuPermissionProfile.menu = menu;
                await menuPermissionProfile.save();
            }
        });
    });
};

export const deleteByProfileId = async (id: number) => await MenuPermissionProfile.delete({ profile: { id } });

export default {
    getByProfileId,
    addPermissions,
    deleteByProfileId
};
