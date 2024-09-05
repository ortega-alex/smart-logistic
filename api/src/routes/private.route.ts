import { Router } from 'express';
import { addProfile, addUser, getProfile, getUsers, updateProfile } from '../controllers';
import { getMenus } from '../controllers/menu.controller';

const routes = Router();

routes.get('/user', getUsers);
routes.post('/user', addUser);

routes.post('/profile', addProfile);
routes.get('/profile', getProfile);
routes.put('/profile/:id', updateProfile);

routes.get('/menu', getMenus);

export const privateRoutes = routes;
