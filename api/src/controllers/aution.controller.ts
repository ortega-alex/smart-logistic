import { Request, Response } from 'express';
import { Aution } from '../entities';

export const getAution = async (_req: Request, res: Response) => {
    try {
        const autions = await Aution.find();
        return res.json(autions);
    } catch (error) {
        return res.status(500).json({ message: (error as Error).message });
    }
};

export const addAution = async (req: Request, res: Response) => {
    try {
        const { subasta, alias } = req.body;
        if (!subasta) return res.status(203).json({ message: 'El nombre es obligatorio' });
        const aution = new Aution();
        aution.subasta = subasta;
        aution.alias = alias ?? null;
        await aution.save();
        return res.json(aution);
    } catch (error) {
        return res.status(500).json({ message: (error as Error).message });
    }
};

export const updateAution = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { subasta, alias, estado } = req.body;

        const aution = await Aution.findOneBy({ id_subasta: Number(id) });
        if (!aution) return res.status(203).json({ message: 'Subasta no encontrada' });

        const update = await Aution.update(
            { id_subasta: Number(id) },
            {
                subasta: subasta ?? aution.subasta,
                alias: alias ?? aution.alias,
                estado: estado ?? aution.estado
            }
        );
        if ((update?.affected ?? 0) > 0) return res.json(aution);
        return res.status(203).json({ mesage: 'No se pudo actualizar la subasta' });
    } catch (error) {
        return res.status(500).json({ message: (error as Error).message });
    }
};
