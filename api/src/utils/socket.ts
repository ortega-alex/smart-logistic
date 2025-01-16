import { Server, Socket } from 'socket.io';

export const setupSocket = (io: Server): void => {
    io.on('connection', (socket: Socket) => {
        console.log('socket connected', socket.id);
    });
};
