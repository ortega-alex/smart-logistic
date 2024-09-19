import { TypeVehicle } from './TypeVehicle';

export interface Vehicle {
    id?: string;
    tipo_vehiculo?: TypeVehicle;
    anio?: string;
    marca?: string;
    modelo?: string;
}
