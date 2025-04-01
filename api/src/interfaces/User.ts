export interface User {
    id?: number;
    name: string;
    user: string;
    password: string;
    phone_number: string;
    email: string;
    is_active: boolean;
}

export type TokenUser = Pick<User, 'email' | 'user'>;
// export type PartialUser = Partial<User, 'nombre'>;
export type RequiredUser = Required<User>;
export type OmitPass = Omit<User, 'contrasenia'>;

export const defaultPassword = `smart-${new Date().getFullYear()}`;
