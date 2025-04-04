import { Request, Response } from 'express';
import TransportTypeService from './transport-type.service';

export const getAll = async (_req: Request, res: Response) => {
    try {
        const transportTypes = await TransportTypeService.getAll();
        return res.json(transportTypes);
    } catch (error) {
        return res.status(500).json({ message: (error as Error).message });
    }
};

export const add = async (req: Request, res: Response) => {
    try {
        const { name } = req.body;
        if (!name) return res.status(400).json({ message: 'El campo nombre es requerido' });
        const newTransportType = await TransportTypeService.add({ name });
        return res.json(newTransportType);
    } catch (error) {
        return res.status(500).json({ message: (error as Error).message });
    }
};

export const update = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { name, is_active } = req.body;
        if (!name) return res.status(400).json({ message: 'El campo nombre es requerido' });

        const transportType = await TransportTypeService.getById(Number(id));
        if (!transportType) return res.status(404).json({ message: 'No se encontro el tipo de transporte' });

        const update = await TransportTypeService.update(Number(id), {
            name: name ?? transportType.name,
            is_active: is_active ?? transportType.is_active
        });
        if (update.affected === 0) return res.status(404).json({ message: 'No se encontro el tipo de transporte' });
        return res.json({ ...transportType, name, is_active });
    } catch (error) {
        return res.status(500).json({ message: (error as Error).message });
    }
};

export default {
    getAll,
    add,
    update
};
