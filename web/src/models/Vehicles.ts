import { ImportState, Quoter } from './';

export interface Vehicles {
    id_vehiculo: number;
    lote: string;
    cotizacion: Quoter;
    estado_importacion: ImportState;
    estado: string;
    fecha_creacion: string;
}
