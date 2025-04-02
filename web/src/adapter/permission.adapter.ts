import { Menu, MenuPermissionProfile } from '@/interfaces';

export const permissionMenuAdapter = (values: []) => {
    const permissions: any = {};
    let menus: Array<Menu> = [];

    values.forEach((item: MenuPermissionProfile) => {
        if (!permissions[item.menu.id]) permissions[item.menu.id] = [item.permission.id];
        else permissions[item.menu.id].push(item.permission.id);

        if (!menus.some(_item => _item.id === item.menu.id)) menus.push(item.menu);
    });
    return { permissions, menus };
};
