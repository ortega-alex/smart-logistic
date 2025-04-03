import { Request, Response } from 'express';
import { getImportStateById as getImportStateByIdService } from '../import/import.service';
import { getById as getQuoterByIdService } from '../quoter/quoter.service';
import {
    add as addVehicleService,
    update as updateVehicleService,
    getAll as getAllVehicleService,
    getById as getVehicleByIdService,
    getByCustomerId as getVehiclesByCustomerIdService,
    pagination as paginationVehicleService
} from './vehicle.service';

export const getAll = async (_req: Request, res: Response) => {
    try {
        const vehicles = await getAllVehicleService();
        return res.json(vehicles);
    } catch (error) {
        return res.status(500).json({ message: (error as Error).message });
    }
};

export const getById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const vehicle = await getVehicleByIdService(Number(id));
        if (!vehicle) return res.status(203).json({ error: true, message: 'Vehiculo no encontrado' });
        return res.json(vehicle);
    } catch (error) {
        return res.status(500).json({ message: (error as Error).message });
    }
};

export const paginated = async (req: Request, res: Response) => {
    try {
        const { pageSize = 100, current = 1, sortField = 'id', sortOrder = 'ASC', filter = '' } = req.body;

        const validFields = [
            'id',
            'customer_id',
            'import_state_id',
            'created_at',
            'lot',
            'seller',
            'customer',
            'importState',
            'quoter',
            'transportType',
            'headquarter'
        ];
        if (!validFields.includes(sortField)) return res.status(203).json({ message: 'Campo de orden inválido' });

        const validDirections = ['ASC', 'DESC'];
        if (!validDirections.includes(sortOrder.toUpperCase())) return res.status(203).json({ message: 'Dirección de orden inválida' });

        const [data, total] = await paginationVehicleService(filter, sortField, sortOrder, current, pageSize);

        return res.status(200).json({
            data,
            total,
            current: Number(current),
            pageSize: Number(pageSize),
            totalPages: Math.ceil(total / pageSize)
        });
    } catch (error) {
        return res.status(500).json({ message: (error as Error).message });
    }
};

export const getByCustomerId = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const vehicles = await getVehiclesByCustomerIdService(Number(id));
        return res.status(200).json(vehicles);
    } catch (error) {
        return res.status(500).json({ message: (error as Error).message });
    }
};

export const add = async (req: Request, res: Response) => {
    try {
        const { quoter_id, import_state_id } = req.body;
        if (!quoter_id) return res.status(203).json({ error: true, message: 'La cotizacion es requerido' });

        const quoter = await getQuoterByIdService(Number(quoter_id));
        if (!quoter) return res.status(203).json({ error: true, message: 'Cotizacion no encontrada' });

        const importState = await getImportStateByIdService(Number(import_state_id));
        if (!importState) return res.status(203).json({ error: true, message: 'estado de importacion no encontrado' });

        const vehicle = await addVehicleService({
            quoter,
            importState
        });
        if (!vehicle) return res.status(203).json({ error: true, message: 'No se pudo agregar el vehiculo' });
        return res.json({ message: 'Vehiculo agregado correctamente', vehicle });
    } catch (error) {
        return res.status(500).json({ message: (error as Error).message });
    }
};

export const update = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { quoter_id, import_state_id, is_active } = req.body;

        const vehicle = await getVehicleByIdService(Number(id));
        if (!vehicle) return res.status(203).json({ error: true, message: 'Vehiculo no encontrado' });

        let quoter;
        if (!quoter_id) quoter = await getQuoterByIdService(Number(id));

        let importState;
        if (import_state_id) importState = await getImportStateByIdService(Number(import_state_id));

        const update = await updateVehicleService(Number(id), {
            is_active: is_active ?? vehicle.is_active,
            quoter: quoter ?? vehicle.quoter,
            importState: importState ?? vehicle.importState
        });

        if (update.affected === 0) return res.status(203).json({ error: true, message: 'No se pudo actualizar el vehiculo' });
        return res.json({ message: 'Vehiculo actualizado correctamente' });
    } catch (error) {
        return res.status(500).json({ message: (error as Error).message });
    }
};
