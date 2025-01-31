import { Request, Response } from 'express';
import { Customer, Notification, User, Vehicles } from '../entities';
import { Notification as NotificationType } from '../model';
import { Socket } from 'socket.io';

export const newNotification = async (_notificacion: NotificationType, io: Socket) => {
    const { id_vehiculo, id_cliente, id_usuario, titulo, contenido, estado } = _notificacion;
    const notificacion = new Notification();

    if (id_vehiculo) {
        const vehicles = await Vehicles.findOneBy({ id_vehiculo: Number(id_vehiculo) });
        if (vehicles) notificacion.vehiculo = vehicles;
    }

    if (id_cliente) {
        const cliente = await Customer.findOneBy({ id_cliente: Number(id_cliente) });
        if (cliente) notificacion.cliente = cliente;
    }

    if (id_usuario) {
        const usuario = await User.findOneBy({ id_usuario: Number(id_usuario) });
        if (usuario) notificacion.usuario = usuario;
    }

    notificacion.titulo = titulo;
    notificacion.contenido = contenido;
    notificacion.estado = estado ?? true;
    notificacion.fecha_creacion = new Date();
    const save = await notificacion.save();

    if (notificacion.cliente) io.emit(`notification-${notificacion.cliente.id_cliente}`, notificacion);
    if (notificacion.usuario) io.emit(`notification-${notificacion.usuario.id_usuario}`, notificacion);
    else io.emit('notification', notificacion);

    return save;
};

export const addNotification = async (req: Request, res: Response) => {
    try {
        const { titulo, contenido } = req.body;
        if (!titulo) return res.status(203).json({ message: 'El titulo es obligatorio' });
        if (!contenido) return res.status(203).json({ message: 'El contenido es obligatorio' });
        const notificacion = await newNotification(req.body, req.app.locals.io);
        return res.json(notificacion);
    } catch (error) {
        return res.status(500).json({ message: (error as Error).message });
    }
};

export const getNotificationByCustomer = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const notificacion = await Notification.createQueryBuilder('notification')
            .innerJoinAndSelect('notification.cliente', 'cliente')
            .leftJoinAndSelect('notification.vehiculo', 'vehiculo')
            .where('cliente.id_cliente = :id', { id: Number(id) })
            .orderBy('notification.fecha_creacion', 'DESC')
            .limit(50)
            .getMany();
        return res.json(notificacion);
    } catch (error) {
        return res.status(500).json({ message: (error as Error).message });
    }
};

export const getNotificationByUserId = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const notificacion = await Notification.createQueryBuilder('notification')
            .leftJoinAndSelect('notification.usuario', 'usuario')
            .leftJoinAndSelect('notification.cliente', 'cliente')
            .leftJoinAndSelect('notification.vehiculo', 'vehiculo')
            .where('usuario.id_usuario = :id', { id: Number(id) })
            .orWhere('cliente.id_cliente IS NULL')
            .orderBy('notification.fecha_creacion', 'DESC')
            .limit(50)
            .getMany();
        return res.json(notificacion);
    } catch (error) {
        return res.status(500).json({ message: (error as Error).message });
    }
};

export const updateNotification = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const notificacion = await Notification.findOneBy({ id_notificacion: id });
        if (!notificacion) return res.status(203).json({ message: 'Notificacion no encontrada' });

        const update = await Notification.update({ id_notificacion: id }, { visto: true });

        if ((update?.affected ?? 0) > 0) return res.json(notificacion);
        return res.status(203).json({ mesage: 'No se pudo actualizar la notificacion' });
    } catch (error) {
        return res.status(500).json({ message: (error as Error).message });
    }
};
