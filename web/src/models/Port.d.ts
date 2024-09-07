export interface Port {
    id_puerto: number;
    puerto: string;
    estado: boolean;
}

export const EmptyPort: Port = {
    id_puerto: 0,
    puerto: '',
    estado: true
};
