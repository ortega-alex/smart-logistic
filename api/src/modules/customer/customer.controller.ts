import { Request, Response } from 'express';
import { save as saveCustomerFileService } from '../customer-file/customer-file.service';
import { getById as getCustomerTypeByIdService } from '../customer-type/customer-type.service';
import CustomerService from './customer.service';
import { generateToken } from '../../middleware';

export const login = async (req: Request, res: Response) => {
    try {
        const { email } = req.body;
        if (!email) return res.status(203).json({ message: 'El correo es requerido' });

        const customer = await CustomerService.getByEmail(email);
        if (!customer) return res.status(203).json({ message: 'El cliente no existe' });

        const token = generateToken({
            email,
            user: customer?.name
        });

        return res.json({
            customer,
            token
        });
    } catch (error) {
        return res.status(500).json({ message: (error as Error).message });
    }
};

export const add = async (req: Request, res: Response) => {
    try {
        const { name, phone_number, landline, address, nit, dpi, email, customer_type_id } = req.body;
        if (!name) return res.status(203).json({ message: 'El cliente es requerido' });
        if (!phone_number) return res.status(203).json({ message: 'El telefono celular es requerido' });
        if (!address) return res.status(203).json({ message: 'La direccion es requerida' });
        if (!nit) return res.status(203).json({ message: 'El nit es requerido' });
        if (!dpi) return res.status(203).json({ message: 'El dpi es requerido' });
        if (!email) return res.status(203).json({ message: 'El correo es requerido' });
        if (!customer_type_id) return res.status(203).json({ message: 'El tipo de cliente es requerido' });

        const customerType = await getCustomerTypeByIdService(Number(customer_type_id));
        if (!customerType) return res.status(404).json({ message: 'Tipo de cliente no encontrado' });

        const customer = await CustomerService.add({
            name,
            phone_number,
            landline,
            address,
            nit,
            dpi,
            email,
            type: customerType
        });

        const files = req.files as Express.Multer.File[];
        if (files) saveCustomerFileService(customer, files);

        res.json(customer);
    } catch (error) {
        return res.status(500).json({ message: (error as Error).message });
    }
};

export const getAll = async (_req: Request, res: Response) => {
    try {
        const customer = await CustomerService.getAll();
        return res.json(customer);
    } catch (error) {
        return res.status(500).json({ message: (error as Error).message });
    }
};

export const getById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const customer = await CustomerService.getById(Number(id));
        if (!customer) return res.status(404).json({ message: 'Cliente no exite' });
        return res.json(customer);
    } catch (error) {
        return res.status(500).json({ message: (error as Error).message });
    }
};

export const update = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { name, phone_number, landline, address, nit, dpi, email, customer_type_id, token_fcm } = req.body;
        const customer = await CustomerService.getById(Number(id));
        if (!customer) return res.status(404).json({ message: 'Cliente no exite' });

        let customerType = null;
        if (customer_type_id) customerType = await getCustomerTypeByIdService(Number(customer_type_id));

        const update = await CustomerService.update(Number(id), {
            name: name ?? customer.name,
            phone_number: phone_number ?? customer.phone_number,
            landline: landline ?? customer.landline,
            address: address ?? customer.address,
            nit: nit ?? customer.nit,
            dpi: dpi ?? customer.dpi,
            email: email ?? customer.email,
            token_fcm: token_fcm ?? customer.token_fcm,
            type: customerType ?? customer.type
        });
        if ((update?.affected ?? 0) > 0) {
            const files = req.files as Express.Multer.File[];
            if (files) saveCustomerFileService(customer, files);
            return res.json(customer);
        }
        return res.status(203).json({ message: 'No se pudo actualizar el cliente' });
    } catch (error) {
        return res.status(500).json({ message: (error as Error).message });
    }
};

export const pagination = async (req: Request, res: Response) => {
    try {
        const { pageSize = 100, current = 1, sortField = 'id', sortOrder = 'ASC', filter = '' } = req.body;

        // Validar que los valores recibidos sean correctos
        const validFields = ['id', 'name', 'dpi', 'nit', 'phone_number', 'email', 'type']; // Lista de campos válidos para ordenar
        if (!validFields.includes(sortField)) return res.status(203).json({ message: 'Campo de orden inválido' });

        const validDirections = ['ASC', 'DESC'];
        if (!validDirections.includes(sortOrder.toUpperCase())) return res.status(203).json({ message: 'Dirección de orden inválida' });

        const [data, total] = await CustomerService.pagination(filter, sortField, sortOrder, Number(current), Number(pageSize));

        // Retornar los datos paginados
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

export default {
    login,
    getAll,
    getById,
    add,
    update,
    pagination
};
