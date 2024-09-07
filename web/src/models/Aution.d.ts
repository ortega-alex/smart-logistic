export interface Aution {
    id_subasta: number;
    subasta: string;
    alias?: string;
    estado: boolean;
}

export const EmptyAution: Aution = {
    id_subasta: 0,
    subasta: '',
    estado: true
};
