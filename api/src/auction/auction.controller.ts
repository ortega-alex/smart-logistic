import { Request, Response } from 'express';
import {
    getAll as getAllAutionService,
    getById as getAutionByIdService,
    add as addAutionService,
    update as updateAutionService
} from './auction.service';
import { getById as getStateByIdService } from '../state/state.service';
import { getById as getSedeByIdService } from '../headquarter/headquarter.service';

export const getAll = async (_req: Request, res: Response) => {
    try {
        const autions = await getAllAutionService();
        return res.json(autions);
    } catch (error) {
        return res.status(500).json({ message: (error as Error).message });
    }
};

export const getById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const auction = await getAutionByIdService(Number(id));
        if (!auction) return res.status(203).json({ error: true, message: 'No se encontro la subasta' });
        return res.json(auction);
    } catch (error) {
        return res.status(500).json({ message: (error as Error).message });
    }
};

export const add = async (req: Request, res: Response) => {
    try {
        const { name, crane_rate, state_id, headquarter_id } = req.body;
        if (!name) return res.status(203).json({ error: true, message: 'El nombre es obligatorio' });
        if (!crane_rate) return res.status(203).json({ error: true, message: 'El tipo de vehiculo es obligatorio' });
        if (!state_id) return res.status(203).json({ error: true, message: 'El tipo de vehiculo es obligatorio' });
        if (!headquarter_id) return res.status(203).json({ error: true, message: 'El tipo de vehiculo es obligatorio' });

        const state = await getStateByIdService(Number(state_id));
        if (!state) return res.status(203).json({ error: true, message: 'No se encontro el estado' });

        const headquarter = await getSedeByIdService(Number(headquarter_id));
        if (!headquarter) return res.status(203).json({ error: true, message: 'No se encontro la sede' });

        const aution = await addAutionService({
            name,
            crane_rate,
            state,
            headquarter
        });
        return res.json({ message: 'Subasta agregada correctamente', aution });
    } catch (error) {
        return res.status(500).json({ message: (error as Error).message });
    }
};

export const updateById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { name, crane_rate, is_active, state_id, headquarter_id } = req.body;

        const auction = await getAutionByIdService(Number(id));
        if (!auction) return res.status(203).json({ error: true, message: 'No se encontro la subasta' });

        let state;
        if (state_id) state = await getStateByIdService(Number(state_id));

        let headquarter;
        if (headquarter_id) headquarter = await getSedeByIdService(Number(headquarter_id));

        const update = await updateAutionService(Number(id), {
            name: name ?? auction.name,
            crane_rate: crane_rate ?? auction.crane_rate,
            is_active: is_active ?? auction.is_active,
            state: state ?? auction.state,
            headquarter: headquarter ?? auction.headquarter
        });

        if ((update?.affected ?? 0) > 0)
            return res.json({ message: 'Subasta actualizada correctamente', auction: { ...auction, ...req.body } });
        return res.status(203).json({ error: true, mesage: 'No se pudo actualizar la subasta' });
    } catch (error) {
        return res.status(500).json({ error: true, message: (error as Error).message });
    }
};
