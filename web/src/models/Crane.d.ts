import { Aution } from './Aution';

export enum Moneda {
    USD = 'USD',
    GTQ = 'GTQ'
}

export interface Crane {
    id_grua: number;
    grua: string;
    subasta?: Aution;
    id_subasta?: number;
    estado: boolean;
    costo: number;
    moneda: Moneda;
}

export const EmptyCrane: Crane = {
    id_grua: 0,
    grua: '',
    estado: true,
    moneda: Moneda.USD,
    costo: 0
};
