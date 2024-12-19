import { Router } from 'express';
import { login, loginCustomer } from '../controllers';

const routes = Router();

routes.post('/login', login);
routes.post('/customer/login', loginCustomer);

export const publicRoutes = routes;
