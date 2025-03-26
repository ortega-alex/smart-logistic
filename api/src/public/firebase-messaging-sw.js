/* eslint-disable no-undef */
importScripts('https://www.gstatic.com/firebasejs/8.10.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.10.1/firebase-messaging.js');

const firebaseConfig = {
    apiKey: 'AIzaSyAztmZDEow4QclkTGS5Shg8ipB4jha8tFI',
    authDomain: 'smart-logistic-b668e.firebaseapp.com',
    projectId: 'smart-logistic-b668e',
    storageBucket: 'smart-logistic-b668e.firebasestorage.app',
    messagingSenderId: '407412759437',
    appId: '1:407412759437:web:3ab472b6bd721cff3cfbc4'
};

firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();
messaging.onBackgroundMessage(({ notification }) => {
    console.log('[firebase-messaging-sw.js] Received background message ', notification);
    self.registration.showNotification(notification?.title ?? 'Nueva notificacion', {
        body: notification?.body ?? 'Nueva notificacion',
        icon: './maskable_icon.png'
    });
});
