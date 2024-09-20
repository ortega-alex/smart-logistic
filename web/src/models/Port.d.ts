export interface Port {
    id_puerto: number;
    puerto: string;
    estado: boolean;
    costo_embarque: number;
    costo_aduanal: number;
}

export const EmptyPort: Port = {
    id_puerto: 0,
    puerto: '',
    estado: true,
    costo_embarque: 0,
    costo_aduanal: 0
};
