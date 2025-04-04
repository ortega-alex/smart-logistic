import { Headquarter } from '../../headquarter/entity/Headquarter';
import { Profile } from '../../profile/entity/Profile';

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

export type OptionalUser = Partial<User>;
