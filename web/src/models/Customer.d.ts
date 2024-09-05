export interface Customer {
    id_cliente: number;
    cliente: string;
    telefono_celular: string;
    telefono_fijo?: string;
    direccion: string;
    nit: string;
    dpi: string;
    correo: string;
    estado: boolean;
    id_tipo_cliente?: number;
    archivos?: Array<File>;
}
