import { Request, Response } from 'express';
import {
    getAll as getAllVehicleTypeService,
    save as saveVehicleTypeService,
    getById as getTypeVehicleByIdService,
    update as updateVehicleTypeService
} from './vehicle-type.service';

export const getAll = async (_req: Request, res: Response) => {
    try {
        const vehiclesTypes = await getAllVehicleTypeService();
        return res.json(vehiclesTypes);
    } catch (error) {
        return res.status(500).json({ message: (error as Error).message });
    }
};

export const add = async (req: Request, res: Response) => {
    try {
        const { name } = req.body;
        if (!name) return res.status(203).json({ message: 'El nombre es obligatorio' });
        const vehicleType = await saveVehicleTypeService({ name });
        return res.json(vehicleType);
    } catch (error) {
        return res.status(500).json({ message: (error as Error).message });
    }
};

export const updateById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { name, is_active } = req.body;

        const vehicleType = await getTypeVehicleByIdService(Number(id));
        if (!vehicleType) return res.status(203).json({ message: 'Tipo de Vehiculo no encontrado' });

        const update = await updateVehicleTypeService(Number(id), {
            name: name ?? vehicleType.name,
            is_active: is_active ?? vehicleType.is_active
        });
        if ((update?.affected ?? 0) > 0) return res.json(vehicleType);
        return res.status(203).json({ mesage: 'No se pudo actualizar el tipo de vehiculo' });
    } catch (error) {
        return res.status(500).json({ message: (error as Error).message });
    }
};
