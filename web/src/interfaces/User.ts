import { Permission } from './Menu';

export interface Profile {
    id: number;
    name: string;
    is_active: boolean;
    permissions?: Array<Permission> | { [keu: string]: [string] };
}

// import { Permission } from './Permission';
// import { ObjectCustomer } from './Utilityes';

// export interface Profile {
//     id_perfil: number;
//     perfil: string;
//     estado: boolean;
//     permisos?: Permission[];
//     _permisos?: { [keu: string]: [string] };
// }

// export const EmptyProfile: Profile = {
//     id_perfil: 0,
//     perfil: '',
//     estado: true
// };

export interface User {
    id: number;
    name: string;
    username: string;
    password?: string;
    email: string;
    phone_number: string;
    is_active: boolean;
    token_fcm?: string;
    profile?: Profile;
}

export interface Sesion extends User {
    session_id: number;
    iniciales: string;
}

export type Loogin = Pick<User, 'username' | 'password'>;
export type OnlyEmail = Pick<User, 'email'>;

// export const UserEmpty: TypeUser = {
//     id_usuario: 0,
//     correo: '',
//     estado: true,
//     nombre: '',
//     telefono: '',
//     usuario: ''
// };

export interface UserForgotPassword {
    email?: string;
    code?: string;
}
