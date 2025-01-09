import { Profile } from './Profile';

export interface User {
    id_usuario: number;
    id_perfil?: number;
    id_vendedor?: number;
    usuario: string;
    correo: string;
    telefono: string;
    nombre: string;
    cotrasenia?: string;
    estado: boolean;
    perfil?: Profile;
}

export interface Sesion extends User {
    id_sesion: number;
    iniciales: string;
}

export type Login = Pick<User, 'usuario' | 'cotrasenia'>;
export type OnlyEmail = Pick<User, 'correo'>;

export const UserEmpty: TypeUser = {
    id_usuario: 0,
    correo: '',
    estado: true,
    nombre: '',
    telefono: '',
    usuario: ''
};

export interface UserForgotPassword {
    correo?: string;
    codigo?: string;
}
