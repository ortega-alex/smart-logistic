import { Customer, ImportState, User } from './';

export interface ImportHistory {
    id_historial_importacion: string;
    usuario: User;
    cliente: Customer;
    estado_importacion: ImportState;
    descripcion: string;
    archivo: string | Array<any>;
    visible_cliente: boolean;
    fecha_creacion: string;
}

// export interface ImportHistoryEvidence {
//     descripcion: string;
//     image: Array<any>;
//     visible_cliente: boolean;
// }
