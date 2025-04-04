import { Request, Response } from 'express';
import orderPaperService from './order-paper.service';
import { getById as getUserByIdService } from '../user/user.service';
import { getById as getCustomerByIdService } from '../customer/customer.service';

export const getAll = async (_req: Request, res: Response) => {
    try {
        const orderPapers = await orderPaperService.getAll();
        return res.json(orderPapers);
    } catch (error) {
        return res.status(500).json({ message: (error as Error).message });
    }
};

export const getById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const orderPaper = await orderPaperService.getById(Number(id));
        if (!orderPaper) return res.status(404).json({ message: 'No se encontro el pedido' });
        return res.json(orderPaper);
    } catch (error) {
        return res.status(500).json({ message: (error as Error).message });
    }
};

export const getAllStatus = async (_req: Request, res: Response) => {
    try {
        const orderPaperStatus = await orderPaperService.getAllStatus();
        return res.json(orderPaperStatus);
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

        const status = await orderPaperService.getStatusById(Number(status_id));
        if (!status) return res.status(404).json({ message: 'No se encontro el estado' });

        let customer;
        if (customer_id) customer = await getCustomerByIdService(Number(customer_id));

        const orderPaper = await orderPaperService.add({
            title,
            description,
            date: new Date(date + ' UTC'),
            is_active,
            status,
            user,
            customer: customer ?? undefined
        });
        if (!orderPaper) return res.status(404).json({ message: 'No se pudo agendar' });
        return res.json({ message: 'Cita agendada correctamente', success: true });
    } catch (error) {
        return res.status(500).json({ message: (error as Error).message });
    }
};

export const update = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { title, description, date, is_active, user_id, status_id, customer_id } = req.body;

        const orderPaper = await orderPaperService.getById(Number(id));
        if (!orderPaper) return res.status(404).json({ message: 'No se encontro la cita' });

        let user;
        if (user_id) user = await getUserByIdService(Number(user_id));

        let status;
        if (status_id) status = await orderPaperService.getStatusById(Number(status_id));

        let customer;
        if (customer_id) customer = await getCustomerByIdService(Number(customer_id));

        const update = await orderPaperService.update(Number(id), {
            title: title ?? orderPaper.title,
            description: description ?? orderPaper.description,
            date: new Date(date + ' UTC') ?? orderPaper.date,
            is_active: is_active ?? orderPaper.is_active,
            user: user ?? orderPaper.user,
            status: status ?? orderPaper.status,
            customer: customer ?? orderPaper.customer
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
    getAllStatus,
    add,
    update
};
