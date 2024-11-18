import { Request, Response } from 'express';
import { ImportState, Quoter, Vehicles } from '../entities';

export interface Vehicle {
    id_vehiculo?: number;
    lote?: string;
}

export const newVehicle = async (data: Vehicle, cotizacion: Quoter, estado_importacion: ImportState) => {
    try {
        const vehicle = new Vehicles();
        vehicle.cotizacion = cotizacion;
        vehicle.estado_importacion = estado_importacion;
        if (data.lote) vehicle.lote = data.lote;

        const result = await vehicle.save();
        return result;
    } catch (error) {
        return error;
    }
};

export const addVehicles = async (req: Request, res: Response) => {
    try {
        const { id_cotizacion, id_estado_importacion, lote } = req.body;
        if (!id_cotizacion) return res.status(203).json({ message: 'La cotizacion es requerido' });
        if (!lote) return res.status(203).json({ message: 'El no de lote es requerido' });

        const quoter = await Quoter.findOneBy({ id_cotizacion: Number(id_cotizacion) });
        if (!quoter) return res.status(203).json({ message: 'Cotizacion no encontrada' });

        const estado_importacion = await ImportState.findOneBy({ id_estado_importacion: Number(id_estado_importacion ?? 1) });
        if (!estado_importacion) return res.status(203).json({ message: 'estado de importacion no encontrado' });

        const vehiculo = await newVehicle({ lote }, quoter, estado_importacion);
        if (!vehiculo) return res.status(203).json({ message: 'No se pudo agregar el vehiculo' });
        res.status(200).json(vehiculo);
    } catch (error) {
        return res.status(500).json({ message: (error as Error).message });
    }
};

export const getVehicles = async (_req: Request, res: Response) => {
    try {
        const vehicles = await Vehicles.find({
            relations: {
                cotizacion: true,
                estado_importacion: true
            }
        });
        return res.json(vehicles);
    } catch (error) {
        return res.status(500).json({ message: (error as Error).message });
    }
};

export const getVehiclesById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const vehicle = await Vehicles.findOne({
            where: { id_vehiculo: Number(id) },
            relations: {
                cotizacion: {
                    cliente: true,
                    vendedor: true,
                    tipo_veniculo: true,
                    puerto: true,
                    grua_usd: true,
                    grua_gt: true,
                    subasta: true,
                    detalles: true
                },
                estado_importacion: true
            }
        });
        if (!vehicle) return res.status(203).json({ message: 'Vehiculo no encontrado' });

        return res.json(vehicle);
    } catch (error) {
        return res.status(500).json({ message: (error as Error).message });
    }
};

export const getVechiclesPaginatedData = async (req: Request, res: Response) => {
    try {
        const { pageSize = 100, current = 1, sortField = 'id_vehiculo', sortOrder = 'ASC', filter = '' } = req.body;

        const validFields = [
            'id_vehiculo',
            'id_usuario',
            'id_cliente',
            'id_estado_importacion',
            'fecha_creacion',
            'lote',
            'vendedor',
            'cliente',
            'estado_importacion'
        ];
        if (!validFields.includes(sortField)) return res.status(203).json({ message: 'Campo de orden inválido' });

        const validDirections = ['ASC', 'DESC'];
        if (!validDirections.includes(sortOrder.toUpperCase())) return res.status(203).json({ message: 'Dirección de orden inválida' });

        const query = Vehicles.createQueryBuilder('vehicle')
            .leftJoinAndSelect('vehicle.cotizacion', 'cotizacion')
            .leftJoinAndSelect('vehicle.estado_importacion', 'estado_importacion')
            .leftJoinAndSelect('cotizacion.cliente', 'cliente')
            .leftJoinAndSelect('cotizacion.vendedor', 'vendedor');

        if (filter != '') {
            if (isNaN(Number(filter))) {
                query
                    .where('vehicle.fecha_creacion LIKE :filter', { filter: `%${filter}%` })
                    .orWhere('vehicle.lote LIKE :filter', { filter: `%${filter}%` })
                    .orWhere('cliente.cliente LIKE :filter', { filter: `%${filter}%` })
                    .orWhere('vendedor.nombre LIKE :filter', { filter: `%${filter}%` })
                    .orWhere('estado_importacion.estado_importacion LIKE :filter', { filter: `%${filter}%` });
            } else {
                query
                    .where('cliente.id_cliente = :id', { id: Number(filter) })
                    .orWhere('cotizacion.id_cotizacion = :id', { id: Number(filter) })
                    .orWhere('estado_importacion.id_estado_importacion = :id', { id: Number(filter) });
            }
        }

        if (sortField.includes('cliente')) query.orderBy(`cliente.${sortField}`, sortOrder.toUpperCase() as 'ASC' | 'DESC');
        else if (sortField.includes('vendedor')) query.orderBy(`vendedor.nombre`, sortOrder.toUpperCase() as 'ASC' | 'DESC');
        else if (sortField.includes('estado_importacion'))
            query.orderBy(`estado_importacion.estado_importacion`, sortOrder.toUpperCase() as 'ASC' | 'DESC');
        else query.orderBy(`vehicle.${sortField}`, sortOrder.toUpperCase() as 'ASC' | 'DESC');

        query.skip((current - 1) * pageSize).take(pageSize);

        const [data, total] = await query.getManyAndCount();

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
