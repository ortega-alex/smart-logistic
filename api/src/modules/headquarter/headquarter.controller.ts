import { Request, Response } from 'express';
import HeadquarterService from './headquarter.service';
import { getById as getStateByIdService } from '../state/state.service';
import { getById as getDepartmentByIdService } from '../department/department.service';

export const getAll = async (req: Request, res: Response) => {
    try {
        const { filter } = req.params;
        const headquarters = await HeadquarterService.getAll(filter);
        return res.json(headquarters);
    } catch (error) {
        return res.status(500).json({ message: (error as Error).message });
    }
};

export const getById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const headquarter = await HeadquarterService.getById(Number(id));
        return res.json(headquarter);
    } catch (error) {
        return res.status(500).json({ message: (error as Error).message });
    }
};

export const add = async (req: Request, res: Response) => {
    try {
        const { name, address, state_id, department_id } = req.body;

        if (!name) return res.status(203).json({ message: 'El campo nombre es requerido' });
        if (!state_id && !department_id) return res.status(203).json({ message: 'El campo department o el estado es requerido' });

        let state;
        if (state_id) state = await getStateByIdService(Number(state_id));
        if (state_id && !state) return res.status(203).json({ message: 'El campo Estado no existe' });

        let department;
        if (department_id) department = await getDepartmentByIdService(Number(department_id));
        if (department_id && !department) return res.status(203).json({ message: 'El campo Departamento no existe' });

        const headquarter = await HeadquarterService.add({
            name,
            address: address ?? '',
            state: state ?? undefined,
            department: department ?? undefined
        });

        if (!headquarter) return res.status(203).json({ message: 'Error al agregar' });
        return res.json({ success: true, message: 'Se agrego con exito' });
    } catch (error) {
        return res.status(500).json({ message: (error as Error).message });
    }
};

export const update = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { name, address, state_id, department_id } = req.body;

        const headquarter = await HeadquarterService.getById(Number(id));
        if (!headquarter) return res.status(203).json({ message: 'El campo id no existe' });

        if (headquarter.state && department_id)
            return res
                .status(203)
                .json({
                    message:
                        'El campo department no puede ser modificado ya que esta sede tiene un estado y solo se puede modificar el estado'
                });
        if (headquarter.department && state_id)
            return res
                .status(203)
                .json({
                    message:
                        'El campo estado no puede ser modificado ya que esta sede tiene un departamento y solo se puede modificar el departamento'
                });

        let state;
        if (state_id) state = await getStateByIdService(Number(state_id));

        let department;
        if (department_id) department = await getDepartmentByIdService(Number(department_id));

        const update = await HeadquarterService.update(Number(id), {
            name: name ?? headquarter.name,
            address: address ?? headquarter.address,
            state: state ?? headquarter.state,
            department: department ?? headquarter.department
        });
        if (update.affected === 0) return res.status(203).json({ message: 'Error al actualizar la sede' });
        return res.json({ success: true, message: 'Se actualizo con exito la sede' });
    } catch (error) {
        return res.status(500).json({ message: (error as Error).message });
    }
};

export default {
    getAll,
    getById,
    add,
    update
};
