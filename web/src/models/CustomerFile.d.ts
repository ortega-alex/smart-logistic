export interface CustomerFile {
    id_archivo: number;
    ruta: string;
    nombre: string;
    estado: boolean;
}

export const EmptyFile: CustomerFile = {
    id_archivo: 0,
    ruta: '',
    nombre: '',
    estado: true
};
