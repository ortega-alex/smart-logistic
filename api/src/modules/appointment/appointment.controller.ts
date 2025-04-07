import { Request, Response } from 'express';
import appointmentService from './appointment.service';
import { getById as getUserByIdService } from '../user/user.service';
import { getById as getCustomerByIdService } from '../customer/customer.service';

export const getAll = async (_req: Request, res: Response) => {
    try {
        const appointments = await appointmentService.getAll();
        return res.json(appointments);
    } catch (error) {
        return res.status(500).json({ message: (error as Error).message });
    }
};

export const getById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const appointment = await appointmentService.getById(id);
        if (!appointment) return res.status(404).json({ message: 'No se encontro el pedido' });
        return res.json(appointment);
    } catch (error) {
        return res.status(500).json({ message: (error as Error).message });
    }
};

export const getByDateAndUserId = async (req: Request, res: Response) => {
    try {
        const { start_date, end_date, user_id } = req.body;
        const appointments = await appointmentService.getByDateAndUserId(
            new Date(start_date + ' UTC'),
            new Date(end_date + ' UTC'),
            Number(user_id)
        );
        return res.json(appointments);
    } catch (error) {
        return res.status(500).json({ message: (error as Error).message });
    }
};

export const getAllStatus = async (_req: Request, res: Response) => {
    try {
        const appointmentStatus = await appointmentService.getAllStatus();
        return res.json(appointmentStatus);
    } catch (error) {
        return res.status(500).json({ message: (error as Error).message });
    }
};

export const add = async (req: Request, res: Response) => {
    try {
        const { title, description, date, is_active, user_id, status_id, customer_id } = req.body;
        if (!title) return res.status(400).json({ message: 'El titulo es requerido' });
        if (!description) return res.status(400).json({ message: 'El campo descripción es requerido' });
        if (!date) return res.status(400).json({ message: 'La fecha es requerida' });
        if (!user_id) return res.status(400).json({ message: 'El usuario es requerido' });

        const user = await getUserByIdService(Number(user_id));
        if (!user) return res.status(404).json({ message: 'No se encontro el usuario' });

        const status = await appointmentService.getStatusById(status_id);
        if (!status) return res.status(404).json({ message: 'No se encontro el estado' });

        let customer = null;
        if (customer_id) customer = await getCustomerByIdService(Number(customer_id));

        const appointment = await appointmentService.add({
            title,
            description,
            date: new Date(date + ' UTC'),
            is_active,
            status,
            user,
            customer: customer
        });
        if (!appointment) return res.status(404).json({ message: 'No se pudo agendar' });
        return res.json({ message: 'Cita agendada correctamente', success: true, id: appointment.id });
    } catch (error) {
        return res.status(500).json({ message: (error as Error).message });
    }
};

export const update = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { title, description, date, is_active, user_id, status_id, customer_id } = req.body;

        const appointment = await appointmentService.getById(id);
        if (!appointment) return res.status(404).json({ message: 'No se encontro la cita' });

        let user;
        if (user_id) user = await getUserByIdService(Number(user_id));

        let status;
        if (status_id) status = await appointmentService.getStatusById(status_id);

        let customer = null;
        if (customer_id) customer = await getCustomerByIdService(Number(customer_id));

        const update = await appointmentService.update(id, {
            title: title ?? appointment.title,
            description: description ?? appointment.description,
            date: new Date(date + ' UTC') ?? appointment.date,
            is_active: is_active ?? appointment.is_active,
            user: user ?? appointment.user,
            status: status ?? appointment.status,
            customer: customer
        });

        if (update.affected === 0) return res.status(404).json({ message: 'No se pudo actualizar la cita' });
        return res.json({ message: 'Cita actualizada correctamente', success: true });
    } catch (error) {
        return res.status(500).json({ message: (error as Error).message });
    }
};

export default {
    getAll,
    getById,
    getByDateAndUserId,
    getAllStatus,
    add,
    update
};
