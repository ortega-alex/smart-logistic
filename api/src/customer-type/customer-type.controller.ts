import { Request, Response } from 'express';
import {
    save as saveCustomerTypeService,
    getAll as getAllCustomerTypeService,
    getById as getCustomerTypeByIdService,
    update as updateCustomerTypeService
} from '../customer-type/customer-type.service';

export const add = async (req: Request, res: Response) => {
    try {
        const { name } = req.body;
        if (!name) return res.status(203).json({ message: 'El nombre del tipo de cliente es requerido' });
        const customerType = await saveCustomerTypeService({ name });
        return res.json(customerType);
    } catch (error) {
        return res.status(500).json({ message: (error as Error).message });
    }
};

export const getAll = async (_req: Request, res: Response) => {
    try {
        const customerTypes = await getAllCustomerTypeService();
        return res.json(customerTypes);
    } catch (error) {
        return res.status(500).json({ message: (error as Error).message });
    }
};

export const updateById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { name, is_active } = req.body;

        if (!name) return res.status(203).json({ message: 'El nombre del tipo de cliente es requerido' });
        const customerType = await getCustomerTypeByIdService(Number(id));
        if (!customerType) return res.status(203).json({ message: 'Tipo de cliente no encontrado' });
        const update = await updateCustomerTypeService(Number(id), { name, is_active }, customerType);
        if ((update?.affected ?? 0) > 0) return res.json(customerType);

        return res.status(203).json({ message: 'No se pudo actualizar el tipo de cliente' });
    } catch (error) {
        return res.status(500).json({ message: (error as Error).message });
    }
};
