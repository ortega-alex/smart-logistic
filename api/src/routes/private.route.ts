import { Router } from 'express';
import {
    addCustomer,
    addProfile,
    addTypeOfCustomer,
    addUser,
    deleteCustomerFile,
    getCustomer,
    getCustomerById,
    getMenus,
    getProfile,
    getTypeOfCustomers,
    getUsers,
    updateCustomerById,
    updateProfile
} from '../controllers';
import { fileUpload } from '../middleware';

const routes = Router();

routes.get('/user', getUsers);
routes.post('/user', addUser);

routes.post('/profile', addProfile);
routes.get('/profile', getProfile);
routes.put('/profile/:id', updateProfile);

routes.get('/menu', getMenus);

routes.post('/customer', fileUpload.array('files'), addCustomer);
routes.get('/customer', getCustomer);
routes.get('/customer/:id', getCustomerById);
routes.put('/customer/:id', fileUpload.array('files'), updateCustomerById);

routes.delete('/customer-file/:id', deleteCustomerFile);

routes.post('/type-of-customer', addTypeOfCustomer);
routes.get('/type-of-customer', getTypeOfCustomers);

export const privateRoutes = routes;
