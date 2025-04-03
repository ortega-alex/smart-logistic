import { Router } from 'express';
import {
    add as addAuction,
    getAll as getAllAuction,
    getById as getAuctionById,
    updateById as updateAuctionById
} from '../auction/auction.controller';
import { deleteById as deleteCustomerFileById } from '../customer-file/customer-file.controller';
import {
    add as addCustomerType,
    getAll as getAllCustomerTypes,
    updateById as updateTypeOfCustomerById
} from '../customer-type/customer-type.controller';
import {
    add as addCustomer,
    getAll as getAllCustomer,
    getById as getCustomerById,
    getPagination as getCustomerPaginatedData,
    updateById as updateCustomerById
} from '../customer/customer.controller';
import { getAll as getAllSede } from '../headquarter/headquarter.controller';
import { addHistory as addImportHistory, getAll as getImportState } from '../import/import.controller';
import { getByProfileId as getPermissionMenuByProfileId } from '../menu-permission-profile/menu-permission-profile.controller';
import { getAll as getMenus } from '../menu/menu.controller';
import { fileBufferUpload, fileUpload } from '../middleware';
import { getAll as getAllPermission } from '../permission/permission.controller';
import { add as addProfile, getAll as getAllProfile, update as updateProfile } from '../profile/profile.controller';
import {
    add as addQuoter,
    generatePdf as generateQuoterPdf,
    getAll as getAllQuoter,
    getPaginate as getQuoterPaginatedData,
    getById as getQuotersById,
    update as updateQuoter
} from '../quoter/quoter.controller';
import { getAll as getAllState, getById as getStateById } from '../state/state.controller';
import {
    add as addTransportRate,
    getAll as getAllTransportRate,
    getById as getTransportRateById,
    getRateFiler as getTransportRateFiler,
    update as updateTransportRate
} from '../transport-rate/transport-rate.controller';
import {
    add as addTransportType,
    getAll as getAllTransportType,
    update as updateTransportType
} from '../transport-type/transport-type.controller';
import { add as addUser, getAll as getUsers, update as updateUser } from '../user/user.controller';
import {
    add as addVehicleType,
    getAll as getAllVehicleType,
    updateById as updateVehicleTypeById
} from '../vehicle-type/vehicle-type.controller';
import {
    add as addVehicle,
    getAll as getAllVehicle,
    paginated as getVechiclesPaginatedData,
    getById as getVehicleById,
    getByCustomerId as getVehiclesByCustomerId,
    update as updateVehicle
} from '../vehicle/vehicle.controller';

const routes = Router();

routes.get('/user', getUsers);
routes.post('/user', addUser);
routes.put('/user/:id', updateUser);

routes.get('/profile', getAllProfile);
routes.post('/profile', addProfile);
routes.put('/profile/:id', updateProfile);

routes.get('/menu', getMenus);

routes.post('/customer', fileUpload.array('files'), addCustomer);
routes.get('/customer', getAllCustomer);
routes.get('/customer/:id', getCustomerById);
routes.put('/customer/:id', fileUpload.array('files'), updateCustomerById);
routes.post('/customer/pagination', getCustomerPaginatedData);

routes.delete('/customer-file/:id', deleteCustomerFileById);

routes.post('/customer-type', addCustomerType);
routes.get('/customer-type', getAllCustomerTypes);
routes.put('/customer-type/:id', updateTypeOfCustomerById);

routes.get('/vehicle-type', getAllVehicleType);
routes.post('/vehicle-type', addVehicleType);
routes.put('/vehicle-type/:id', updateVehicleTypeById);

routes.get('/permission', getAllPermission);
routes.get('/permission/profile/:id', getPermissionMenuByProfileId);

routes.get('/transport-type', getAllTransportType);
routes.post('/transport-type', addTransportType);
routes.put('/transport-type/:id', updateTransportType);

routes.get('/transport-rate', getAllTransportRate);
routes.get('/transport-rate/:id', getTransportRateById);
routes.post('/transport-rate', addTransportRate);
routes.put('/transport-rate/:id', updateTransportRate);
routes.post('/transport-rate/get-rate', getTransportRateFiler);

routes.get('/aution', getAllAuction);
routes.get('/aution/:id', getAuctionById);
routes.post('/aution', addAuction);
routes.put('/aution/:id', updateAuctionById);

routes.get('/state', getAllState);
routes.get('/state/:id', getStateById);

routes.get('/headquarter/:filter?', getAllSede);

routes.get('/quoter', getAllQuoter);
routes.get('/quoter/:id', getQuotersById);
routes.get('/quoter/invoice/:id', generateQuoterPdf);
routes.post('/quoter', addQuoter);
routes.put('/quoter/:id', updateQuoter);
routes.post('/quoter/pagination', getQuoterPaginatedData);

routes.get('/vehicle', getAllVehicle);
routes.get('/vehicle/:id', getVehicleById);
routes.get('/vehicle/customer/:id', getVehiclesByCustomerId);
routes.post('/vehicle', addVehicle);
routes.post('/vehicle/pagination', getVechiclesPaginatedData);
routes.put('/vehicle/:id', updateVehicle);

routes.get('/import/get-state', getImportState);
routes.post('/import/history/:id', fileBufferUpload.single('path'), addImportHistory);

// // routes.post('/import-history/evidence/:id', validateFileType, addImportHistory);

// routes.post('/notification', addNotification);
// routes.get('/notification/customer/:id', getNotificationByCustomer);
// routes.get('/notification/user/:id', getNotificationByUserId);
// routes.put('/notification/:id', updateNotification);

export const privateRoutes = routes;
