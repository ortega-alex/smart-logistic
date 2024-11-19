import { Customer, ImportState, User } from './';

export interface ImportHistory {
    id_historial_importacion: string;
    usuario: User;
    cliente: Customer;
    estado_importacion: ImportState;
    descripcion: string;
    archivo: string;
    visible_cliente: boolean;
    fecha_creacion: string;
}
