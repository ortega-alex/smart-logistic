export interface State {
    id: number;
    name: string;
    is_active: boolean;
}

export interface Municipality {
    id: number;
    name: string;
    is_active: boolean;
}

export interface Headquarter {
    id: number;
    name: string;
    is_active: boolean;
    state?: State;
    municipality?: Municipality;
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
