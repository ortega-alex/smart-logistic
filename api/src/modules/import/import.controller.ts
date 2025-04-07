import { Request, Response } from 'express';
import { getById as getCustomerByIdService } from '../customer/customer.service';
import { saveFile } from '../../middleware';
import { getById as getUserByIdService } from '../user/user.service';
import { getById as getVehicleByIdService, update as updateVehicleService } from '../vehicle/vehicle.service';
import ImportService from './import.service';
import { add as addNotificationService } from '../notification/notification.service';
import { NotificationPriority } from '../notification/interface/Notification';
import { emitNotificationSocket, enviroment, sendNotification } from '../../utils';

export const getAll = async (_req: Request, res: Response) => {
    try {
        const import_states = await ImportService.getAll();
        res.status(200).json(import_states);
    } catch (error) {
        return res.status(500).json({ message: (error as Error).message });
    }
};

export const addHistory = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { import_state_id, user_id, customer_id, description, is_visible_customer } = req.body;
        const { file } = req;

        if (!import_state_id) return res.status(203).json({ message: 'El estado de importacion es requerido' });
        if (!user_id && !customer_id) return res.status(203).json({ error: true, message: 'El usuario o cliente es requerido' });
        if (!description) return res.status(203).json({ error: true, message: 'La descripcion es requerida' });

        const vehicle = await getVehicleByIdService(Number(id));
        if (!vehicle) return res.status(203).json({ message: 'El vehiculo no existe' });

        const importState = await ImportService.getImportStateById(Number(import_state_id));
        if (!importState) return res.status(203).json({ message: 'El estado de la importacion no exite' });

        let user;
        if (user_id) {
            user = await getUserByIdService(Number(user_id));
            if (!user) return res.status(203).json({ message: 'El usuario no existe' });
        }

        let customer;
        if (customer_id) {
            customer = await getCustomerByIdService(Number(customer_id));
            if (!customer) return res.status(203).json({ message: 'El cliente no existe' });
        }

        let path = '';
        if (file) path = await saveFile(file);

        const history = await ImportService.addHistory({
            description,
            path,
            is_visible_customer: Boolean(is_visible_customer),
            vehicle: vehicle,
            importState: importState,
            user: user ?? undefined,
            customer: customer ?? undefined
        });

        if (!history) return res.status(203).json({ message: 'No se pudo agregar el historial de importacion' });

        const io = req.app.locals.io;
        io.emit(`estado-${id}`, vehicle);

        const message = 'Historial de importacion creado';
        if (vehicle.importState.id !== importState.id) {
            const updateVehicle = await updateVehicleService(Number(vehicle.id), { importState: importState });
            if ((updateVehicle?.affected ?? 0) > 0) {
                const title = 'Nuevo estado';
                const description = `El estado de la importacion con lote: ${vehicle.quoter.lot}, vehículo: ${vehicle.quoter.mark} ${vehicle.quoter.model} ha cambiado a ${importState.name}`;

                const notification = await addNotificationService({
                    title,
                    description,
                    priority: NotificationPriority.LOW,
                    customer: vehicle.quoter.customer,
                    user: vehicle.quoter.seller
                });

                if (notification) {
                    emitNotificationSocket(req.app.locals.io, {
                        customer: vehicle.quoter.customer,
                        user: vehicle.quoter.seller
                    });

                    if (req.headers?.origin?.includes('https') || enviroment.NODE_ENV === 'development') {
                        if (customer?.token_fcm)
                            sendNotification({
                                token: customer.token_fcm,
                                notification: {
                                    title,
                                    body: description
                                },
                                data: {
                                    path: '/customer-order-detail/' + String(vehicle.id)
                                }
                            });

                        if (vehicle.quoter.seller?.token_fcm)
                            sendNotification({
                                token: vehicle.quoter.seller?.token_fcm,
                                notification: {
                                    title,
                                    body: description
                                },
                                data: {
                                    path: '/vehicle/' + String(vehicle.quoter.lot)
                                }
                            });
                    }
                }

                return res.status(200).json({ success: true, message: `${message}, y vehiculo actualizado'` });
            }
            return res.status(203).json({ message: `${message} No se pudo actualizar el vehiculo` });
        }

        return res.status(200).json({ success: true, message });
    } catch (error) {
        return res.status(500).json({ message: (error as Error).message });
    }
};

export default {
    getAll,
    addHistory
};
