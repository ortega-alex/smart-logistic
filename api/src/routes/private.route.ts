import { Router } from 'express';
import {
    addAution,
    addCrane,
    addCustomer,
    addPort,
    addProfile,
    addQuoter,
    addTypeOfCustomer,
    addTypeVehicle,
    addUser,
    deleteCustomerFile,
    getAution,
    getCrane,
    getCustomer,
    getCustomerById,
    getCustomerPaginatedData,
    getMenus,
    getPermission,
    getPermissionMenuByProfileId,
    getPort,
    getProfile,
    getQuoters,
    getTypeOfCustomers,
    getTypeVehicle,
    getUsers,
    updateAution,
    updateCrane,
    updateCustomerById,
    updatePort,
    updateProfile,
    updateQuoter,
    updateTypeOfCustomerById,
    updateTypeVehicle,
    updateUser
} from '../controllers';
import { fileUpload } from '../middleware';

const routes = Router();

routes.get('/user', getUsers);
routes.post('/user', addUser);
routes.put('/user/:id', updateUser);

routes.get('/profile', getProfile);
routes.post('/profile', addProfile);
routes.put('/profile/:id', updateProfile);

routes.get('/menu', getMenus);

routes.post('/customer', fileUpload.array('files'), addCustomer);
routes.get('/customer', getCustomer);
routes.get('/customer/:id', getCustomerById);
routes.put('/customer/:id', fileUpload.array('files'), updateCustomerById);
routes.post('/customer/pagination', getCustomerPaginatedData);

routes.delete('/customer-file/:id', deleteCustomerFile);

routes.post('/type-of-customer', addTypeOfCustomer);
routes.get('/type-of-customer', getTypeOfCustomers);
routes.put('/type-of-customer/:id', updateTypeOfCustomerById);

routes.get('/aution', getAution);
routes.post('/aution', addAution);
routes.put('/aution/:id', updateAution);

routes.get('/crane', getCrane);
routes.post('/crane', addCrane);
routes.put('/crane/:id', updateCrane);

routes.get('/port', getPort);
routes.post('/port', addPort);
routes.put('/port/:id', updatePort);

routes.get('/type-vehicle', getTypeVehicle);
routes.post('/type-vehicle', addTypeVehicle);
routes.put('/type-vehicle/:id', updateTypeVehicle);

routes.get('/permission', getPermission);
routes.get('/permission/:id', getPermissionMenuByProfileId);

routes.get('/quoter', getQuoters);
routes.post('/quoter', addQuoter);
routes.put('/quoter/:id', updateQuoter);

export const privateRoutes = routes;
