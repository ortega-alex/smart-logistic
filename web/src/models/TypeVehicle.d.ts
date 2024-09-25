export interface TypeVehicle {
    id_tipo_vehiculo: number;
    tipo_vehiculo: string;
    estado: boolean;
    porcentaje_costo: number | string;
}

export const EmptyTypeVehicle: TypeVehicle = {
    id_tipo_vehiculo: 0,
    tipo_vehiculo: '',
    estado: true,
    porcentaje_costo: 0
};
