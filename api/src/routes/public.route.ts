import { Router } from 'express';
import { generatePdf, login } from '../controllers';

const routes = Router();

routes.post('/login', login);
routes.get('/invoice/:id', generatePdf);

export const publicRoutes = routes;
