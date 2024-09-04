import { Profile } from './Profile';

export interface User {
    id_usuario: number;
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
