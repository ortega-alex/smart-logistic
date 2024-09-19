export interface Quoter {
    id_cotizacion: number;
    cotizacion: string;
    id_cliente: number;
    cliente: string;
    id_vendedor: number;
    vendedor: string;
    id_tipo_vehiculo: number;
    marca_modelo: string;
    id_puerto: number;
    puerto: string;
    estado: boolean;
    id_grua_usd?: number;
    id_grua_gt?: number;
    id_subasta?: number;
}

export const EmptyQuoter: Quoter = {
    id_cotizacion: 0,
    cotizacion: '',
    id_cliente: 0,
    cliente: '',
    id_vendedor: 0,
    vendedor: '',
    id_tipo_vehiculo: 0,
    marca_modelo: '',
    id_puerto: 0,
    puerto: '',
    estado: true
};
