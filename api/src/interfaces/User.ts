import { Headquarter } from '../modules/headquarter/entity/Headquarter';
import { Profile } from '../modules/profile/entity/Profile';

export interface User {
    id?: number;
    name: string;
    username: string;
    password: string;
    phone_number: string;
    email: string;
    is_active?: boolean;
    token_fcm?: string;
    profile: Profile;
    headquarter: Headquarter;
}

export type TokenUser = Pick<User, 'email' | 'username'>;
// export type PartialUser = Partial<User, 'nombre'>;
export type RequiredUser = Required<User>;
export type OmitPass = Omit<User, 'contrasenia'>;
export type OptionalUser = Partial<User>;

export const defaultPassword = `smart-${new Date().getFullYear()}`;

export interface ACCESS_LEVEL {
    session_id: number;
    level: number;
    headquarter_id?: number;
}
