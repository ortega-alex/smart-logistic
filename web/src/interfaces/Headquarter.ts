export interface State {
    id: number;
    name: string;
    is_active: boolean;
}

export interface Department {
    id: number;
    name: string;
    is_active: boolean;
}

export interface Headquarter {
    id: number;
    name: string;
    is_active: boolean;
    department_id?: number;
    state_id?: number;
    state?: State;
    department?: Department;
}

export enum HeadquarterFilter {
    EEUU = 'eeuu',
    GT = 'gt'
}

export interface Auction {
    id: number;
    name: string;
    is_active: boolean;
    crane_rate: number;
    state?: State;
    headquarter?: Headquarter;
}

export type HeadquarterSeparation = {
    [key: string]: Array<Headquarter>;
};
