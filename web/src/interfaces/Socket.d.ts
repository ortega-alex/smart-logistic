import { Socket } from 'socket.io-client';
import { Notification } from './Notification';
import { Vehicles } from './Vehicles';

// Eventos que envía un mensaje al servidor
export interface ClienteToServerEvents {
    // [event: `notification-${number}`]: (data: string) => void;
}

// Eventos que recibe un mensaje del servidor
export interface ServerToClientEvents {
    [event: `notification-${number}`]: (data: Notification) => void;
    notification: (data: Notification) => void;
    [event: `estado-${string}`]: (data: Vehicles) => void;
}
