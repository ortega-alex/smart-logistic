import { Router } from 'express';
import AuctionController from '../auction/auction.controller';
import CustomerFileController from '../customer-file/customer-file.controller';
import CustomerTypeController from '../customer-type/customer-type.controller';
import CustomerController from '../customer/customer.controller';
import HeadquarterController from '../headquarter/headquarter.controller';
import ImportController from '../import/import.controller';
import MenuPermissionProfileController from '../menu-permission-profile/menu-permission-profile.controller';
import MenuController from '../menu/menu.controller';
import { fileBufferUpload, fileUpload } from '../middleware';
import PermissionController from '../permission/permission.controller';
import ProfileController from '../profile/profile.controller';
import QuoterController from '../quoter/quoter.controller';
import StateController from '../state/state.controller';
import TransportRateController from '../transport-rate/transport-rate.controller';
import TransportTypeController from '../transport-type/transport-type.controller';
import UserController from '../user/user.controller';
import VehicleTypeController from '../vehicle-type/vehicle-type.controller';
import VehicleController from '../vehicle/vehicle.controller';
import OrderPaperController from '../order-paper/order-paper.controller';
import departmentController from '../department/department.controller';

const routes = Router();

routes.get('/user', UserController.getAll);
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

routes.get('/vehicle', VehicleController.getAll);
routes.get('/vehicle/:id', VehicleController.getById);
routes.get('/vehicle/customer/:id', VehicleController.getByCustomerId);
routes.post('/vehicle', VehicleController.add);
routes.post('/vehicle/pagination', VehicleController.paginated);
routes.put('/vehicle/:id', VehicleController.update);

routes.get('/import/get-state', ImportController.getAll);
routes.post('/import/history/:id', fileBufferUpload.single('path'), ImportController.addHistory);

routes.get('/order-paper', OrderPaperController.getAll);
routes.get('/order-paper/status', OrderPaperController.getAllStatus);
routes.get('/order-paper/:id', OrderPaperController.getById);
routes.post('/order-paper', OrderPaperController.add);
routes.put('/order-paper/:id', OrderPaperController.update);

routes.get('/department', departmentController.getAll);

// // routes.post('/import-history/evidence/:id', validateFileType, addImportHistory);

// routes.post('/notification', addNotification);
// routes.get('/notification/customer/:id', getNotificationByCustomer);
// routes.get('/notification/user/:id', getNotificationByUserId);
// routes.put('/notification/:id', updateNotification);

export const privateRoutes = routes;
