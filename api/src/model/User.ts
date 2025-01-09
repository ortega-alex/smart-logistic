export interface User {
    id?: number;
    nombre: string;
    usuario: string;
    contrasenia: string;
    telefono: string;
    correo: string;
    estado: string;
}

export type TokenUser = Pick<User, 'correo' | 'usuario'>;
// export type PartialUser = Partial<User, 'nombre'>;
export type RequiredUser = Required<User>;
export type OmitPass = Omit<User, 'contrasenia'>;

export const defaultPassword = `smart-${new Date().getFullYear()}`;
