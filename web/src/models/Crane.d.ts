import { Aution } from './Aution';

export interface Crane {
    id_grua: number;
    grua: string;
    subasta?: Aution;
    id_subasta?: number;
    estado: boolean;
}

export const EmptyCrane: Crane = {
    id_grua: 0,
    grua: '',
    estado: true
};
