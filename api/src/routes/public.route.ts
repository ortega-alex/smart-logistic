import { Router } from 'express';
import { forgotPassword, login, loginCustomer, resetPassword } from '../controllers';
import { Message, sendNotification } from '../utils';

const routes = Router();

routes.post('/login', login);
routes.post('/customer/login', loginCustomer);

routes.post('/forgot-password', forgotPassword);
routes.put('/auth/reset/:id', resetPassword);
routes.get('/test-notification/:token', async (req, res) => {
    const { token } = req.params;
    if (!token) return res.status(400).send('Falta el token de notificación');
    const message: Message = {
        token: token,
        notification: {
            title: 'Notificación de prueba',
            body: 'Esta es una notificación de prueba'
        },
        data: {
            id: '4',
            lote: 'SERIE'
        }
    };
    sendNotification(message);
    res.send(message);
});

export const publicRoutes = routes;
