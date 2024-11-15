import { Aution, Moneda } from './';

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
    moneda: Moneda.USD || '$',
    costo: 0
};
