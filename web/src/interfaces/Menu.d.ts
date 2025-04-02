export interface Permission {
    id: number;
    name: string;
    is_active: boolean;
}

export interface Menu {
    id: number;
    name: string;
    icon: string;
    path: string;
    path: string;
    is_maintenance: boolean;
    is_main_menu: boolean;
    is_active: boolean;
}

export interface MenuPermissionProfile {
    id: string;
    menu: Menu;
    permission: Permission;
}
