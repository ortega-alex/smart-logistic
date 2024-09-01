export interface User {
    id_usuario: number;
    usuario: string;
    estado: string;
    correo: string;
    nombre_corto?: string;
    nombre_completo: string;
    imagenes?: Array<string>;
    perfil?: string;
}

export interface Sesion extends User {
    id_sesion: number;
}
