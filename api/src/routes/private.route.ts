import { Router } from 'express';
import { addProfile } from '../controllers/profile.controller';
import { addUser, getUsers } from '../controllers';

const routes = Router();

routes.get('/user', getUsers);
routes.post('/user', addUser);

routes.post('/profile', addProfile);

export const privateRoutes = routes;
