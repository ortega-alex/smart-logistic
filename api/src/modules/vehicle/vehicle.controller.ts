import { Request, Response } from 'express';
import { getImportStateById as getImportStateByIdService } from '../import/import.service';
import { getById as getQuoterByIdService } from '../quoter/quoter.service';
import VehicleService from './vehicle.service';
import { getById as getUserByIdService } from '../user/user.service';

export const getAll = async (_req: Request, res: Response) => {
    try {
        const vehicles = await VehicleService.getAll();
        return res.json(vehicles);
    } catch (error) {
        return res.status(500).json({ message: (error as Error).message });
    }
};

export const getById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const vehicle = await VehicleService.getById(Number(id));
        if (!vehicle) return res.status(203).json({ error: true, message: 'Vehiculo no encontrado' });
        return res.json(vehicle);
    } catch (error) {
        return res.status(500).json({ message: (error as Error).message });
    }
};

export const paginated = async (req: Request, res: Response) => {
    try {
        const { session_id, pageSize = 100, current = 1, sortField = 'id', sortOrder = 'ASC', filter = '' } = req.body;

        // permisos de usuario
        if (!session_id) return res.status(203).json({ message: 'EL id en sesion es requerido' });
        let access_level = { session_id, level: 3 };
        if (session_id) {
            const user = await getUserByIdService(Number(session_id));
            access_level.level = user?.profile?.role?.level ?? 3;
        }

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

        const [data, total] = await VehicleService.pagination(filter, sortField, sortOrder, current, pageSize, access_level);

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
        const vehicles = await VehicleService.getByCustomerId(Number(id));
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

        const vehicle = await VehicleService.add({
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

        const vehicle = await VehicleService.getById(Number(id));
        if (!vehicle) return res.status(203).json({ error: true, message: 'Vehiculo no encontrado' });

        let quoter;
        if (!quoter_id) quoter = await getQuoterByIdService(Number(id));

        let importState;
        if (import_state_id) importState = await getImportStateByIdService(Number(import_state_id));

        const update = await VehicleService.update(Number(id), {
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

export default {
    getAll,
    getById,
    getByCustomerId,
    paginated,
    add,
    update
};
