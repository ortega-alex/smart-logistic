import { Aution } from './';

export interface Crane {
    id_grua: number;
    grua: string;
    subasta?: Aution;
    id_subasta?: number;
    estado: boolean;
    costo: number;
    moneda: string;
}

export const EmptyCrane: Crane = {
    id_grua: 0,
    grua: '',
    estado: true,
    moneda: '$',
    costo: 0
};
