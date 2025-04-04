import { Request, Response } from 'express';
import CustomerTypeService from '../customer-type/customer-type.service';

export const getAll = async (_req: Request, res: Response) => {
    try {
        const customerTypes = await CustomerTypeService.getAll();
        return res.json(customerTypes);
    } catch (error) {
        return res.status(500).json({ message: (error as Error).message });
    }
};

export const add = async (req: Request, res: Response) => {
    try {
        const { name } = req.body;
        if (!name) return res.status(203).json({ message: 'El nombre del tipo de cliente es requerido' });
        const customerType = await CustomerTypeService.add({ name });
        if (!customerType) return res.status(203).json({ message: 'No se pudo agregar el tipo de cliente' });
        return res.json({ message: 'Tipo de cliente agregado', success: true });
    } catch (error) {
        return res.status(500).json({ message: (error as Error).message });
    }
};

export const updateById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { name, is_active } = req.body;

        if (!name) return res.status(203).json({ message: 'El nombre del tipo de cliente es requerido' });

        const customerType = await CustomerTypeService.getById(Number(id));
        if (!customerType) return res.status(203).json({ message: 'Tipo de cliente no encontrado' });

        const update = await CustomerTypeService.update(Number(id), {
            name: name ?? customerType.name,
            is_active: is_active ?? customerType.is_active
        });

        if ((update?.affected ?? 0) > 0) return res.json({ message: 'Tipo de cliente actualizado', success: true });
        return res.status(203).json({ message: 'No se pudo actualizar el tipo de cliente' });
    } catch (error) {
        return res.status(500).json({ message: (error as Error).message });
    }
};

export default {
    add,
    getAll,
    updateById
};
