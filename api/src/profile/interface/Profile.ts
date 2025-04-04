import { Role } from '../entity/Role';

export interface Profile {
    id?: number;
    name: string;
    is_active?: boolean;
    role: Role;
}
