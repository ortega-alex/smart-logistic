import { Request, Response } from 'express';
import {
    getAll as getAllTransportRateService,
    getById as getByIdTransportRateService,
    save as saveTransportRateService,
    update as updateTransportRateService
} from './transport-rate.service';
import { getById as getUserByIdService } from '../user/user.service';
import { getById as getVehicleTypeByIdService } from '../vehicle-type/vehicle-type.service';
import { getById as getByIdTransportTypeService } from '../transport-type/transport-type.service';
import { getById as getSedeByIdService } from '../sede/sede.service';
import { getById as getCustomerTypeByIdService } from '../customer-type/customer-type.service';

export const getAll = async (_req: Request, res: Response) => {
    try {
        const transportRates = await getAllTransportRateService();
        return res.json(transportRates);
    } catch (error) {
        return res.status(500).json({ message: (error as Error).message });
    }
};

export const getById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const transportRate = await getByIdTransportRateService(id);
        if (!transportRate) return res.status(404).json({ message: 'No se encontro el tipo de transporte' });
        return res.json(transportRate);
    } catch (error) {
        return res.status(500).json({ message: (error as Error).message });
    }
};

export const add = async (req: Request, res: Response) => {
    try {
        const { rate, is_active, user_id, vehicle_type_id, transport_type_id, sede_id, customer_type_id } = req.body;
        if (!rate) return res.status(400).json({ message: 'El tarifa es requerido' });
        if (!user_id) return res.status(400).json({ message: 'El usuario es requerido' });
        if (!vehicle_type_id) return res.status(400).json({ message: 'El typo de vehiculo es requerido' });
        if (!transport_type_id) return res.status(400).json({ message: 'El tipo de transporte es requerido' });
        if (!sede_id) return res.status(400).json({ message: 'La sede es requerida' });
        if (!customer_type_id) return res.status(400).json({ message: 'El typo de cliente es requerido' });

        const user = await getUserByIdService(Number(user_id));
        if (!user) return res.status(404).json({ message: 'No se encontro el usuario' });

        const vehicleType = await getVehicleTypeByIdService(Number(vehicle_type_id));
        if (!vehicleType) return res.status(404).json({ message: 'No se encontro el tipo de vehiculo' });

        const transportType = await getByIdTransportTypeService(Number(transport_type_id));
        if (!transportType) return res.status(404).json({ message: 'No se encontro el tipo de transporte' });

        const sede = await getSedeByIdService(Number(sede_id));
        if (!sede) return res.status(404).json({ message: 'No se encontro la sede' });

        const customerType = await getCustomerTypeByIdService(Number(customer_type_id));
        if (!customerType) return res.status(404).json({ message: 'No se encontro el tipo de cliente' });

        const newTransportRate = await saveTransportRateService({
            rate,
            is_active,
            user,
            vehicleType,
            transportType,
            sede,
            customerType
        });
        return res.json(newTransportRate);
    } catch (error) {
        return res.status(500).json({ message: (error as Error).message });
    }
};

export const update = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { rate, is_active, user_id, vehicle_type_id, transport_type_id, sede_id, customer_type_id } = req.body;

        const transportRate = await getByIdTransportRateService(id);
        if (!transportRate) return res.status(404).json({ message: 'No se encontro el tipo de transporte' });

        let user;
        if (user_id) user = await getUserByIdService(Number(user_id));

        let vehicleType;
        if (vehicle_type_id) vehicleType = await getVehicleTypeByIdService(Number(vehicle_type_id));

        let transportType;
        if (transport_type_id) transportType = await getByIdTransportTypeService(Number(transport_type_id));

        let sede;
        if (sede_id) sede = await getSedeByIdService(Number(sede_id));

        let customerType;
        if (customer_type_id) customerType = await getCustomerTypeByIdService(Number(customer_type_id));

        const update = await updateTransportRateService(id, {
            rate: rate ?? transportRate.rate,
            is_active: is_active ?? transportRate.is_active,
            user: user ?? transportRate.user,
            vehicleType: vehicleType ?? transportRate.vehicleType,
            transportType: transportType ?? transportRate.transportType,
            sede: sede ?? transportRate.sede,
            customerType: customerType ?? transportRate.customerType
        });
        if (update.affected === 0) return res.status(404).json({ message: 'No se encontro el tipo de transporte' });
        return res.json({ ...transportRate, rate, is_active, user, vehicleType, transportType, sede });
    } catch (error) {
        return res.status(500).json({ message: (error as Error).message });
    }
};
