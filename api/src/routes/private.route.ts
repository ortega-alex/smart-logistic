import { Router } from 'express';
import {
    addAution,
    addCrane,
    addCustomer,
    addImportHistory,
    addPort,
    addProfile,
    addQuoter,
    addTypeOfCustomer,
    addTypeVehicle,
    addUser,
    addVehicles,
    deleteCustomerFile,
    generatePdf,
    getAution,
    getCrane,
    getCustomer,
    getCustomerById,
    getCustomerPaginatedData,
    getImportState,
    getMenus,
    getPermission,
    getPermissionMenuByProfileId,
    getPort,
    getProfile,
    getQuoterPaginatedData,
    getQuoters,
    getQuotersById,
    getTypeOfCustomers,
    getTypeVehicle,
    getUsers,
    getVechiclesPaginatedData,
    getVehicles,
    getVehiclesByCustomerId,
    getVehiclesById,
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
import { fileBufferUpload, fileUpload } from '../middleware';

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
routes.get('/quoter/:id', getQuotersById);
routes.get('/quoter/invoice/:id', generatePdf);
routes.post('/quoter', addQuoter);
routes.put('/quoter/:id', updateQuoter);
routes.post('/quoter/pagination', getQuoterPaginatedData);

routes.get('/vehicles', getVehicles);
routes.get('/vehicles/:id', getVehiclesById);
routes.post('/vehicles', addVehicles);
routes.post('/vehicles/pagination', getVechiclesPaginatedData);
routes.get('/vehicles/customer/:id', getVehiclesByCustomerId);

routes.get('/import-state', getImportState);

routes.post('/import-history/:id', fileBufferUpload.single('file'), addImportHistory);
// routes.post('/import-history/evidence/:id', validateFileType, addImportHistory);

export const privateRoutes = routes;
