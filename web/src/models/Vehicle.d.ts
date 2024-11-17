import { Customer, Port, Quoter, TypeVehicle, User } from './';

export interface Vehicle {
    id?: string;
    tipo_vehiculo?: TypeVehicle;
    anio?: string;
    marca?: string;
    modelo?: string;
}

export interface LandService {
    id: string;
    fecha: string;
    lote: string;
    quote: Quoter;
    estado: string;
}
