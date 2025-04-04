import { Headquarter } from './Headquarter';
import { Permission } from './Menu';

export interface Role {
    id: number;
    name: string;
    level: number;
    is_active: boolean;
}

export interface Profile {
    id: number;
    name: string;
    is_active: boolean;
    permissions?: Array<Permission> | { [keu: string]: [string] };
    role?: Role;
}

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
    headquarter?: Headquarter;
}

export interface Session extends User {
    session_id: number;
    iniciales: string;
}

export type Loogin = Pick<User, 'username' | 'password'>;
export type OnlyEmail = Pick<User, 'email'>;

export interface UserForgotPassword {
    email?: string;
    code?: string;
}
