import { Menu } from '@/models';

export const permissionMenuAdapter = (values: []) => {
    const permisos: any = {};
    let menus: Array<Menu> = [];

    values.forEach((item: any) => {
        if (!permisos[item.menu.id_menu]) permisos[item.menu.id_menu] = [item.permiso.id_permiso];
        else permisos[item.menu.id_menu].push(item.permiso.id_permiso);

        if (!menus.some(_item => _item.id_menu === item.menu.id_menu)) menus.push(item.menu);
    });
    return { permisos, menus };
};
