import { Router } from 'express';
import { addProfile, addUser, getProfile, getUsers, updateProfile } from '../controllers';

const routes = Router();

routes.get('/user', getUsers);
routes.post('/user', addUser);

routes.post('/profile', addProfile);
routes.get('/profile', getProfile);
routes.put('/profile/:id', updateProfile);

export const privateRoutes = routes;
