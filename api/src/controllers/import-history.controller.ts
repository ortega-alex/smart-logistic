import { Request, Response } from 'express';
import { Customer, ImportHistory, ImportState, User, Vehicles } from '../entities';
import { saveFile } from '../middleware';
import { stringToBoolean } from '../utils';

export const addImportHistory = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { id_estado_importacion, id_usuario, id_cliente, descripcion, visible_cliente } = req.body;
        const { file } = req;

        if (!id) return res.status(203).json({ message: 'El id es requerido' });
        if (!id_estado_importacion) return res.status(203).json({ message: 'El estado de importacion es requerido' });
        if (!id_usuario && !id_cliente) return res.status(203).json({ message: 'El usuario o cliente es requerido' });

        const vehicle = await Vehicles.findOne({
            where: { id_vehiculo: Number(id) },
            relations: {
                estado_importacion: true
            }
        });
        if (!vehicle) return res.status(203).json({ message: 'El vehiculo no existe' });

        const import_state = await ImportState.findOneBy({ id_estado_importacion: id_estado_importacion });
        if (!import_state) return res.status(203).json({ message: 'El estado de importacion no existe' });

        let user;
        if (id_usuario) {
            user = await User.findOneBy({ id_usuario: id_usuario });
            if (!user) return res.status(203).json({ message: 'El usuario no existe' });
        }

        let customer;
        if (id_cliente) {
            const customer = await Customer.findOneBy({ id_cliente });
            if (!customer) return res.status(203).json({ message: 'El cliente no existe' });
        }

        let archivo = '';
        if (file) archivo = await saveFile(file);

        const history = new ImportHistory();
        history.vehiculo = vehicle;
        history.estado_importacion = import_state;
        if (user) history.usuario = user;
        if (customer) history.cliente = customer;
        history.descripcion = descripcion;
        history.visible_cliente = stringToBoolean(visible_cliente ?? true);
        history.archivo = archivo;
        await history.save();

        if (vehicle.estado_importacion.id_estado_importacion !== import_state.id_estado_importacion) {
            const update = await Vehicles.update(
                { id_vehiculo: Number(id) },
                {
                    estado_importacion: import_state
                }
            );

            if ((update?.affected ?? 0) > 0) return res.status(200).json({ success: true, message: 'Historial de importacion creado' });
            return res.status(203).json({ message: 'No se pudo actualizar el vehiculo' });
        }

        return res.status(200).json({ success: true, message: 'Historial de importacion creado' });
    } catch (error) {
        return res.status(500).json({ message: (error as Error).message });
    }
};
