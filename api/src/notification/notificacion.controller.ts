import { Request, Response } from 'express';
import { Socket } from 'socket.io';
import { getById as getCustomerByIdService } from '../customer/customer.service';
import { getById as getUserByIdService } from '../user/user.service';
import { NotificationOptional, NotificationPriority } from './interface/Notification';
import NotificationService from './notification.service';

export const emitNotificationSocket = async (io: Socket, notificacion: NotificationOptional) => {
    if (notificacion.customer) io.emit(`notification-${notificacion.customer?.id}`, notificacion);
    else if (notificacion.user) io.emit(`notification-${notificacion.user?.id}`, notificacion);
    else io.emit('notification', notificacion);
};

export const getAll = async (_req: Request, res: Response) => {
    try {
        const notificacions = await NotificationService.getAll({});
        return res.json(notificacions);
    } catch (error) {
        return res.status(500).json({ message: (error as Error).message });
    }
};

export const getByCustomerId = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const notificacions = await NotificationService.getAll({ customer_id: Number(id) });
        res.json(notificacions);
    } catch (error) {
        return res.status(500).json({ message: (error as Error).message });
    }
};

export const getByUserId = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const notificacions = await NotificationService.getAll({ user_id: Number(id) });
        return res.json(notificacions);
    } catch (error) {
        return res.status(500).json({ message: (error as Error).message });
    }
};

export const add = async (req: Request, res: Response) => {
    try {
        const { title, description, path, priority, customer_id, user_id } = req.body;
        if (!title) return res.status(203).json({ message: 'El titulo es obligatorio' });
        if (!description) return res.status(203).json({ message: 'El contenido es obligatorio' });
        let _priority = priority
            ? NotificationPriority[(priority ?? NotificationPriority.LOW) as keyof typeof NotificationPriority]
            : NotificationPriority.LOW;

        let customer = null;
        if (customer_id) customer = await getCustomerByIdService(Number(customer_id));

        let user = null;
        if (user_id) user = await getUserByIdService(Number(user_id));

        const notificacion = await NotificationService.add({
            title,
            description,
            path,
            priority: _priority,
            customer,
            user
        });
        if (notificacion) {
            emitNotificationSocket(req.app.locals.io, {
                customer: notificacion.customer,
                user: notificacion.user
            });
            return res.json({ success: true, message: 'Notificacion creada' });
        }
        return res.status(203).json({ message: 'No se pudo crear la notificacion' });
    } catch (error) {
        return res.status(500).json({ message: (error as Error).message });
    }
};

export const update = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const notificacion = await NotificationService.getById(id);
        if (!notificacion) return res.status(203).json({ message: 'Notificacion no encontrada' });

        const update = await NotificationService.update(id, { seen: true });

        if ((update?.affected ?? 0) > 0) return res.json({ success: true, message: 'Notificacion actualizada' });
        return res.status(203).json({ mesage: 'No se pudo actualizar la notificacion' });
    } catch (error) {
        return res.status(500).json({ message: (error as Error).message });
    }
};

export default {
    getAll,
    getByCustomerId,
    getByUserId,
    add,
    update
};
