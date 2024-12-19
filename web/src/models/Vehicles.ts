import { EmptyImportState, EmptyQuoter, ImportHistory, ImportState, Quoter } from './';

export interface Vehicles {
    id_vehiculo: number;
    lote: string;
    cotizacion: Quoter;
    estado_importacion: ImportState;
    historial_vechiculo: Array<ImportHistory>;
    estado: boolean;
    fecha_creacion?: string;
}

export const EmptyVehicle: Vehicles = {
    id_vehiculo: 0,
    lote: '',
    cotizacion: EmptyQuoter,
    estado_importacion: EmptyImportState,
    historial_vechiculo: [],
    estado: true
};
