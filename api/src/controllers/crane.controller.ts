import { Request, Response } from 'express';
import { Aution, Crane } from '../entities';

export const getCrane = async (_req: Request, res: Response) => {
    try {
        const cranes = await Crane.find({
            relations: {
                subasta: true
            }
        });
        return res.json(cranes);
    } catch (error) {
        return res.status(500).json({ message: (error as Error).message });
    }
};

export const addCrane = async (req: Request, res: Response) => {
    try {
        const { grua, id_subasta, costo, moneda } = req.body;
        if (!grua) return res.status(203).json({ message: 'El nombre es obligatorio' });
        if (!costo) return res.status(203).json({ message: 'El costo es obligatorio' });
        if (!moneda) return res.status(203).json({ message: 'La moneda es obligatorio' });

        let aution;
        if (id_subasta) {
            aution = await Aution.findOneBy({ id_subasta: Number(id_subasta) });
            if (!aution) return res.status(203).json({ message: 'No se pudo recuperar la subasta' });
        }

        const crane = new Crane();
        crane.grua = grua;
        if (aution) crane.subasta = aution;
        crane.costo = costo;
        crane.moneda = moneda;
        await crane.save();

        return res.json(crane);
    } catch (error) {
        return res.status(500).json({ message: (error as Error).message });
    }
};

export const updateCrane = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { id_subasta, grua, estado, costo, moneda } = req.body;

        const crane = await Crane.findOneBy({ id_grua: Number(id) });
        if (!crane) return res.status(203).json({ message: 'Grua no encontrada' });

        let aution = null;
        if (id_subasta) {
            aution = await Aution.findOneBy({ id_subasta: Number(id_subasta) });
            if (!aution) return res.status(203).json({ message: 'No se pudo recuperar la subasta' });
        }

        const update = await Crane.update(
            { id_grua: Number(id) },
            {
                // @ts-ignore
                subasta: aution,
                grua: grua ?? crane.grua,
                estado: estado ?? crane.estado,
                costo: costo ?? crane.costo,
                moneda: moneda ?? crane.moneda
            }
        );
        if ((update?.affected ?? 0) > 0) return res.json(crane);
        return res.status(203).json({ mesage: 'No se pudo actualizar la subasta' });
    } catch (error) {
        return res.status(500).json({ message: (error as Error).message });
    }
};
