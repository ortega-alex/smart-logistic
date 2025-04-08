import { Server, Socket } from 'socket.io';

export const setupSocket = (io: Server): void => {
    io.on('connection', (socket: Socket) => {
        console.log('socket connected', socket.id, socket.handshake.auth);

        socket.onAny((event, ...args) => {
            console.log(`📤 Emitted to server: ${event}`, args);
        });

        socket.on('connect_error', err => {
            console.error('❌ connect_error', err);
        });
    });
};
