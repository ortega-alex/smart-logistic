import { Request, Response } from 'express';
import VehicleTypeService from './vehicle-type.service';

export const getAll = async (_req: Request, res: Response) => {
    try {
        const vehiclesTypes = await VehicleTypeService.getAll();
        return res.json(vehiclesTypes);
    } catch (error) {
        return res.status(500).json({ message: (error as Error).message });
    }
};

export const add = async (req: Request, res: Response) => {
    try {
        const { name } = req.body;
        if (!name) return res.status(203).json({ message: 'El nombre es obligatorio' });
        const vehicleType = await VehicleTypeService.add({ name });
        if (!vehicleType) return res.status(203).json({ message: 'No se pudo agregar el tipo de vehiculo' });
        return res.json({ message: 'Tipo de Vehiculo agregado correctamente', success: true });
    } catch (error) {
        return res.status(500).json({ message: (error as Error).message });
    }
};

export const update = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { name, is_active } = req.body;

        const vehicleType = await VehicleTypeService.getById(Number(id));
        if (!vehicleType) return res.status(203).json({ message: 'Tipo de Vehiculo no encontrado' });

        const update = await VehicleTypeService.update(Number(id), {
            name: name ?? vehicleType.name,
            is_active: is_active ?? vehicleType.is_active
        });
        if ((update?.affected ?? 0) > 0) return res.json({ message: 'Tipo de Vehiculo actualizado correctamente', success: true });
        return res.status(203).json({ mesage: 'No se pudo actualizar el tipo de vehiculo' });
    } catch (error) {
        return res.status(500).json({ message: (error as Error).message });
    }
};

export default {
    getAll,
    add,
    update
};
