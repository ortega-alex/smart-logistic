import { Request, Response } from 'express';
import { Port } from '../entities';

export const getPort = async (_req: Request, res: Response) => {
    try {
        const ports = await Port.find();
        return res.json(ports);
    } catch (error) {
        return res.status(500).json({ message: (error as Error).message });
    }
};

export const addPort = async (req: Request, res: Response) => {
    try {
        const { puerto } = req.body;
        if (!puerto) return res.status(203).json({ message: 'El nombre es obligatorio' });
        const port = new Port();
        port.puerto = puerto;
        await port.save();
        return res.json(port);
    } catch (error) {
        return res.status(500).json({ message: (error as Error).message });
    }
};

export const updatePort = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { puerto, estado } = req.body;

        const port = await Port.findOneBy({ id_puerto: Number(id) });
        if (!port) return res.status(203).json({ message: 'Puerto no encontrada' });

        const update = await Port.update(
            { id_puerto: Number(id) },
            {
                puerto: puerto ?? port.puerto,
                estado: estado ?? port.estado
            }
        );
        if ((update?.affected ?? 0) > 0) return res.json(port);
        return res.status(203).json({ mesage: 'No se pudo actualizar la subasta' });
    } catch (error) {
        return res.status(500).json({ message: (error as Error).message });
    }
};
