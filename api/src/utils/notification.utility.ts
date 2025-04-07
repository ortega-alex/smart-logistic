import * as admin from 'firebase-admin';
import { enviroment } from './enviroment';
import { Socket } from 'socket.io';
import { NotificationOptional } from '../modules/notification/interface/Notification';

const serviceAaccount = JSON.parse(enviroment.FIREBASE_ADMIN_CREDENTIAL);

admin.initializeApp({
    credential: admin.credential.cert(serviceAaccount)
});

export interface Message {
    token: string;
    notification: {
        title: string;
        body: string;
    };
    android?: {
        notification: {
            icon: string;
            color: string;
            sound?: string;
        };
    };
    webpush?: {
        notification: {
            fcmOptions: {
                link?: string;
                image?: string;
            };
        };
    };
    data?: {
        [key: string]: string;
    };
}

export const sendNotification = async (message: Message) =>
    admin
        .messaging()
        .send(message)
        .then(response => console.log('Notification sent', response))
        .catch(error => console.log('Error sending notification', error));

export const emitNotificationSocket = async (io: Socket, notificacion: NotificationOptional) => {
    if (notificacion.customer) io.emit(`notification-${notificacion.customer?.id}`, notificacion);
    else if (notificacion.user) io.emit(`notification-${notificacion.user?.id}`, notificacion);
    else io.emit('notification', notificacion);
};
