import { Request, Response } from 'express';
import { TypeVehicle } from '../entities';

export const getTypeVehicle = async (_req: Request, res: Response) => {
    try {
        const type_vehicles = await TypeVehicle.find();
        return res.json(type_vehicles);
    } catch (error) {
        return res.status(500).json({ message: (error as Error).message });
    }
};

export const addTypeVehicle = async (req: Request, res: Response) => {
    try {
        const { tipo_vehiculo } = req.body;
        if (!tipo_vehiculo) return res.status(203).json({ message: 'El nombre es obligatorio' });
        const type_vehicle = new TypeVehicle();
        type_vehicle.tipo_vehiculo = tipo_vehiculo;
        await type_vehicle.save();
        return res.json(type_vehicle);
    } catch (error) {
        return res.status(500).json({ message: (error as Error).message });
    }
};

export const updateTypeVehicle = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { tipo_vehiculo, estado } = req.body;

        const type_vehicle = await TypeVehicle.findOneBy({ id_tipo_vehiculo: Number(id) });
        if (!type_vehicle) return res.status(203).json({ message: 'Tipo de Vehiculo no encontrado' });

        const update = await TypeVehicle.update(
            { id_tipo_vehiculo: Number(id) },
            {
                tipo_vehiculo: tipo_vehiculo ?? type_vehicle.tipo_vehiculo,
                estado: estado ?? type_vehicle.estado
            }
        );
        if ((update?.affected ?? 0) > 0) return res.json(type_vehicle);
        return res.status(203).json({ mesage: 'No se pudo actualizar el tipo de vehiculo' });
    } catch (error) {
        return res.status(500).json({ message: (error as Error).message });
    }
};
