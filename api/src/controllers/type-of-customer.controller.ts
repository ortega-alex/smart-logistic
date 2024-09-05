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
