import { _KEYS } from '@/constants';
import { initializeApp } from 'firebase/app';
import { getMessaging, getToken, onMessage } from 'firebase/messaging';

const firebaseConfig = {
    apiKey: 'AIzaSyAztmZDEow4QclkTGS5Shg8ipB4jha8tFI',
    authDomain: 'smart-logistic-b668e.firebaseapp.com',
    projectId: 'smart-logistic-b668e',
    storageBucket: 'smart-logistic-b668e.firebasestorage.app',
    messagingSenderId: '407412759437',
    appId: '1:407412759437:web:3ab472b6bd721cff3cfbc4'
};

let messaging: any;
if (window.location.protocol === 'https:') {
    initializeApp(firebaseConfig);
    messaging = getMessaging();
}

export const askNotificationPermission = async (): Promise<boolean> => {
    try {
        const permission = await Notification.requestPermission();
        if (permission === 'granted') return true;
        return false;
    } catch (error) {
        console.error('Error al solicitar permiso de notificaciones:', error);
        return false;
    }
};

export const requestForToken = async () => {
    try {
        const hasPermission = await askNotificationPermission();
        if (!hasPermission) return null;
        if (messaging) {
            const token = await getToken(messaging, { vapidKey: _KEYS.FIREBASE_TOKEN });
            return token;
        }
    } catch (error) {
        console.log('Error al recuperar el token', error);
        return null;
    }
};

export const onMessageListener = () => new Promise(resolve => onMessage(messaging, payload => resolve(payload)));
