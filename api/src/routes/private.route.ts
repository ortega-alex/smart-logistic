import { Router } from 'express';
import AppointmentController from '../modules/appointment/appointment.controller';
import AuctionController from '../modules/auction/auction.controller';
import CustomerFileController from '../modules/customer-file/customer-file.controller';
import CustomerTypeController from '../modules/customer-type/customer-type.controller';
import CustomerController from '../modules/customer/customer.controller';
import departmentController from '../modules/department/department.controller';
import HeadquarterController from '../modules/headquarter/headquarter.controller';
import ImportController from '../modules/import/import.controller';
import MenuPermissionProfileController from '../modules/menu-permission-profile/menu-permission-profile.controller';
import MenuController from '../modules/menu/menu.controller';
import { fileBufferUpload, fileUpload } from '../middleware';
import PermissionController from '../modules/permission/permission.controller';
import ProfileController from '../modules/profile/profile.controller';
import QuoterController from '../modules/quoter/quoter.controller';
import StateController from '../modules/state/state.controller';
import TransportRateController from '../modules/transport-rate/transport-rate.controller';
import TransportTypeController from '../modules/transport-type/transport-type.controller';
import UserController from '../modules/user/user.controller';
import VehicleTypeController from '../modules/vehicle-type/vehicle-type.controller';
import VehicleController from '../modules/vehicle/vehicle.controller';
import NotificationController from '../modules/notification/notificacion.controller';

const routes = Router();

routes.get('/user', UserController.getAll);
routes.get('/user/:id', UserController.getById);
routes.post('/user', UserController.add);
routes.put('/user/:id', UserController.update);

routes.get('/profile', ProfileController.getAll);
routes.get('/profile/roles', ProfileController.getRoles);
routes.post('/profile', ProfileController.add);
routes.put('/profile/:id', ProfileController.update);

routes.get('/menu', MenuController.getAll);

routes.post('/customer', fileUpload.array('files'), CustomerController.add);
routes.get('/customer', CustomerController.getAll);
routes.get('/customer/:id', CustomerController.getById);
routes.put('/customer/:id', fileUpload.array('files'), CustomerController.update);
routes.post('/customer/pagination', CustomerController.pagination);

routes.delete('/customer-file/:id', CustomerFileController.deleteById);

routes.post('/customer-type', CustomerTypeController.add);
routes.get('/customer-type', CustomerTypeController.getAll);
routes.put('/customer-type/:id', CustomerTypeController.updateById);

routes.get('/vehicle-type', VehicleTypeController.getAll);
routes.post('/vehicle-type', VehicleTypeController.add);
routes.put('/vehicle-type/:id', VehicleTypeController.update);

routes.get('/permission', PermissionController.getAll);
routes.get('/permission/profile/:id', MenuPermissionProfileController.getByProfileId);

routes.get('/transport-type', TransportTypeController.getAll);
routes.post('/transport-type', TransportTypeController.add);
routes.put('/transport-type/:id', TransportTypeController.update);

routes.get('/transport-rate', TransportRateController.getAll);
routes.get('/transport-rate/:id', TransportRateController.getById);
routes.post('/transport-rate', TransportRateController.add);
routes.put('/transport-rate/:id', TransportRateController.update);
routes.post('/transport-rate/get-rate', TransportRateController.getRateFiler);

routes.get('/aution', AuctionController.getAll);
routes.get('/aution/:id', AuctionController.getById);
routes.post('/aution', AuctionController.add);
routes.put('/aution/:id', AuctionController.updateById);

routes.get('/state', StateController.getAll);
routes.get('/state/:id', StateController.getById);

routes.get('/headquarter/:filter?', HeadquarterController.getAll);
routes.get('/headquarter/:id', HeadquarterController.getById);
routes.post('/headquarter', HeadquarterController.add);
routes.put('/headquarter/:id', HeadquarterController.update);

routes.get('/quoter', QuoterController.getAll);
routes.get('/quoter/:id', QuoterController.getById);
routes.get('/quoter/invoice/:id', QuoterController.generatePdf);
routes.post('/quoter', QuoterController.add);
routes.put('/quoter/:id', QuoterController.update);
routes.post('/quoter/pagination', QuoterController.pagination);
routes.post('/quoter/send-email', QuoterController.sendEmailCustomer);

routes.get('/vehicle', VehicleController.getAll);
routes.get('/vehicle/:id', VehicleController.getById);
routes.get('/vehicle/customer/:id', VehicleController.getByCustomerId);
routes.post('/vehicle', VehicleController.add);
routes.post('/vehicle/pagination', VehicleController.paginated);
routes.put('/vehicle/:id', VehicleController.update);

routes.get('/import/get-state', ImportController.getAll);
routes.post('/import/history/:id', fileBufferUpload.single('path'), ImportController.addHistory);

routes.get('/appointment', AppointmentController.getAll);
routes.get('/appointment/status', AppointmentController.getAllStatus);
routes.get('/appointment/:id', AppointmentController.getById);
routes.post('/appointment', AppointmentController.add);
routes.post('/appointment/date', AppointmentController.getByDateAndUserId);
routes.put('/appointment/:id', AppointmentController.update);

routes.get('/department', departmentController.getAll);

// // routes.post('/import-history/evidence/:id', validateFileType, addImportHistory);

routes.get('/notification', NotificationController.getAll);
routes.get('/notification/customer/:id', NotificationController.getByCustomerId);
routes.get('/notification/user/:id', NotificationController.getByUserId);
routes.post('/notification', NotificationController.add);
routes.put('/notification/:id', NotificationController.update);

export const privateRoutes = routes;
