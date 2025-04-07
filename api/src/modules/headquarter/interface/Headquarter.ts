import { Department } from '../../department/entity/Department';
import { State } from '../../state/entity/State';

export interface Headquarter {
    name: string;
    address?: string;
    is_active?: boolean;
    state?: State;
    department?: Department;
}

export enum HeadquarterFilter {
    EEUU = 'eeuu',
    GT = 'gt'
}
