import { Request, Response } from 'express';
import fs from 'fs';
import { Jimp } from 'jimp';
import { Customer, ImportHistory, ImportState, User, Vehicles } from '../entities';
import { remaneFile, validatePath } from '../middleware';
import { enviroment, stringToBoolean } from '../utils';

export const uploadInvoice = async (req: Request, res: Response) => {
    try {
        const { file } = req;
        const { id } = req.params;
        const { id_cliente } = req.body;
        if (!file) return res.status(203).json({ message: 'El archivo es requerido' });

        const vehicle = await Vehicles.findOneBy({ id_vehiculo: Number(id) });
        if (!vehicle) return res.status(203).json({ message: 'El vehiculo no existe' });

        const customer = await Customer.findOneBy({ id_cliente });
        if (!customer) return res.status(203).json({ message: 'El cliente no existe' });

        const import_state = await ImportState.findOneBy({ id_estado_importacion: 1 });
        if (!import_state) return res.status(203).json({ message: 'El estado de importacion no existe' });

        const history = new ImportHistory();
        history.vehiculo = vehicle;
        history.estado_importacion = import_state;
        history.archivo = `${enviroment.URI_FILE}/${file.filename}`;
        history.cliente = customer;
        history.descripcion = 'El cliente ha cargado la factura';
        history.visible_cliente = true;
        history.save();

        const import_state_change = await ImportState.findOneBy({ id_estado_importacion: 2 });
        if (!import_state_change) return res.status(203).json({ message: 'El estado de importacion no existe' });

        const update = await Vehicles.update(
            { id_vehiculo: Number(id) },
            {
                estado_importacion: import_state_change
            }
        );

        if ((update?.affected ?? 0) > 0) {
            return res.status(200).json({ success: true, message: 'Archivo cargado correctamente' });
        }
        return res.status(203).json({ message: 'No se pudo actualizar el vehiculo' });
    } catch (error) {
        return res.status(500).json({ message: (error as Error).message });
    }
};

export const addImportHistory = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { id_estado_importacion, id_usuario, descripcion, visible_cliente } = req.body;
        const { file } = req;

        if (!id) return res.status(203).json({ message: 'El id es requerido' });
        if (!id_estado_importacion) return res.status(203).json({ message: 'El estado de importacion es requerido' });
        if (!id_usuario) return res.status(203).json({ message: 'El usuario es requerido' });

        const vehicle = await Vehicles.findOne({
            where: { id_vehiculo: Number(id) },
            relations: {
                estado_importacion: true
            }
        });
        if (!vehicle) return res.status(203).json({ message: 'El vehiculo no existe' });

        const import_state = await ImportState.findOneBy({ id_estado_importacion: id_estado_importacion });
        if (!import_state) return res.status(203).json({ message: 'El estado de importacion no existe' });

        const user = await User.findOneBy({ id_usuario: id_usuario });
        if (!user) return res.status(203).json({ message: 'El usuario no existe' });

        let archivo = '';
        if (file) {
            if (file) {
                const image = await Jimp.read(file.buffer);
                const buffer = await image.resize({ w: 512 }).getBuffer('image/jpeg');

                // Renombrar y guardar la imagen
                const name = remaneFile(file.originalname);
                const ruta = validatePath(enviroment.URI_IMAGES);
                await fs.writeFileSync(`${ruta}/${name}`, buffer);

                // Establecer la ruta del archivo redimensionado
                archivo = `${enviroment.URI_IMAGES}/${name}`;
            }
        }

        const history = new ImportHistory();
        history.vehiculo = vehicle;
        history.estado_importacion = import_state;
        history.usuario = user;
        history.descripcion = descripcion;
        history.visible_cliente = stringToBoolean(visible_cliente);
        history.archivo = archivo;
        history.save();

        if (vehicle.estado_importacion.id_estado_importacion !== import_state.id_estado_importacion) {
            const update = await Vehicles.update(
                { id_vehiculo: Number(id) },
                {
                    estado_importacion: import_state
                }
            );

            if ((update?.affected ?? 0) > 0) {
                return res.status(200).json({ success: true, message: 'Historial de importacion creado' });
            }
            return res.status(203).json({ message: 'No se pudo actualizar el vehiculo' });
        }

        return res.status(200).json({ success: true, message: 'Historial de importacion creado' });
    } catch (error) {
        return res.status(500).json({ message: (error as Error).message });
    }
};
