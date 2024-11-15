import { Router } from 'express';
import { login } from '../controllers';

const routes = Router();

routes.post('/login', login);

export const publicRoutes = routes;
