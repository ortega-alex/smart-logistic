import { Router } from 'express';
import { forgotPassword, login, loginCustomer, resetPassword } from '../controllers';

const routes = Router();

routes.post('/login', login);
routes.post('/customer/login', loginCustomer);

routes.post('/forgot-password', forgotPassword);
routes.put('/auth/reset/:id', resetPassword);

export const publicRoutes = routes;
