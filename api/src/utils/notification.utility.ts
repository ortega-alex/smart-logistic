import * as admin from 'firebase-admin';
import { enviroment } from './enviroment';

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
