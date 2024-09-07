import { Permission } from './Permission';
import { ObjectCustomer } from './Utilityes';

export interface Profile {
    id_perfil: number;
    perfil: string;
    estado: boolean;
    permisos?: Permission[];
    _permisos?: { [keu: string]: [string] };
}

export const EmptyProfile: Profile = {
    id_perfil: 0,
    perfil: '',
    estado: true
};
