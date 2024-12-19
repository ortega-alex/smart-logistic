import { Request, Response } from 'express';
import { TypeOfCustomer } from '../entities';

export const addTypeOfCustomer = async (req: Request, res: Response) => {
    try {
        const { tipo_cliente } = req.body;
        if (!tipo_cliente) return res.status(203).json({ message: 'El tipo_cliente es requerido' });
        const typeOfCusomer = new TypeOfCustomer();
        typeOfCusomer.tipo_cliente = tipo_cliente;
        await typeOfCusomer.save();
        return res.json(typeOfCusomer);
    } catch (error) {
        return res.status(500).json({ message: (error as Error).message });
    }
};

export const getTypeOfCustomers = async (_req: Request, res: Response) => {
    try {
        const typeOfCusomer = await TypeOfCustomer.find();
        return res.json(typeOfCusomer);
    } catch (error) {
        return res.status(500).json({ message: (error as Error).message });
    }
};

export const updateTypeOfCustomerById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { tipo_cliente, estado } = req.body;

        if (!tipo_cliente) return res.status(203).json({ message: 'El tipo_cliente es requerido' });

        const typeOfCustomer = await TypeOfCustomer.findOneBy({ id_tipo_cliente: Number(id) });
        if (!typeOfCustomer) return res.status(203).json({ message: 'Tipo de cliente no encontrado' });

        const update = await TypeOfCustomer.update(
            { id_tipo_cliente: Number(id) },
            {
                tipo_cliente: tipo_cliente ?? typeOfCustomer.tipo_cliente,
                estado: estado ?? typeOfCustomer.estado
            }
        );

        if ((update?.affected ?? 0) > 0) {
            return res.json(typeOfCustomer);
        }
        return res.status(203).json({ message: 'No se pudo actualizar el tipo de cliente' });
    } catch (error) {
        return res.status(500).json({ message: (error as Error).message });
    }
};
