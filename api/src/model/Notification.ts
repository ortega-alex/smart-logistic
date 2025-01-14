export interface Notification {
    id_notification?: string;
    id_vehiculo?: number;
    id_cliente?: number;
    id_usuario?: number;
    titulo: string;
    contenido: string;
    visto?: boolean;
    estado?: boolean;
}
