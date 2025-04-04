import { Customer, User, Vehicles } from '../models';

export interface Notification {
    id_notificacion: number;
    titulo: string;
    contenido: string;
    prioridad: string;
    visto: boolean;
    estado: boolean;
    fecha_creacion: string;
    cliente?: Customer;
    usuario?: User;
    vehiculo?: Vehicles;
}
