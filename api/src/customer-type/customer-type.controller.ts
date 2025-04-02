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
        await saveCustomerTypeService({ name });
        return res.json({ message: 'Tipo de cliente agregado' });
    } catch (error) {
        return res.status(500).json({ error: true, message: (error as Error).message });
    }
};

export const getAll = async (_req: Request, res: Response) => {
    try {
        const customerTypes = await getAllCustomerTypeService();
        return res.json(customerTypes);
    } catch (error) {
        return res.status(500).json({ error: true, message: (error as Error).message });
    }
};

export const updateById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { name, is_active } = req.body;

        if (!name) return res.status(203).json({ message: 'El nombre del tipo de cliente es requerido' });
        const customerType = await getCustomerTypeByIdService(Number(id));
        if (!customerType) return res.status(203).json({ message: 'Tipo de cliente no encontrado' });
        const update = await updateCustomerTypeService(Number(id), {
            name: name ?? customerType.name,
            is_active: is_active ?? customerType.is_active
        });
        if ((update?.affected ?? 0) > 0) return res.json({ message: 'Tipo de cliente actualizado' });
        return res.status(203).json({ error: true, message: 'No se pudo actualizar el tipo de cliente' });
    } catch (error) {
        return res.status(500).json({ error: true, message: (error as Error).message });
    }
};
