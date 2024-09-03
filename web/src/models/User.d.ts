import { Profile } from './Profile';

export interface User {
    id_usuario: number;
    usuario: string;
    estado: string;
    correo: string;
    nombre_corto?: string;
    nombre_completo: string;
    imagenes?: Array<string>;
    perfil?: Profile;
}

export interface Sesion extends User {
    id_sesion: number;
}
