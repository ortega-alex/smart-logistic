import { Request, Response } from 'express';
import { save as saveCustomerFileService } from '../customer-file/customer-file.service';
import { getById as getCustomerTypeByIdService } from '../customer-type/customer-type.service';
import {
    getAll as getAllCustomerService,
    getByEmail as getCustomerByEmailService,
    getById as getCustomerByIdService,
    pagination as paginationCustomerService,
    save as saveCustomerService,
    update as updateCustomerService
} from '../customer/customer.service';
import { generateToken } from '../middleware';

export const login = async (req: Request, res: Response) => {
    try {
        const { email } = req.body;
        if (!email) return res.status(203).json({ message: 'El correo es requerido' });

        const customer = await getCustomerByEmailService(email);
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

        const customer = await saveCustomerService(
            {
                name,
                phone_number,
                landline,
                address,
                nit,
                dpi,
                email
            },
            customerType
        );

        const files = req.files as Express.Multer.File[];
        if (files) saveCustomerFileService(customer, files);

        res.json(customer);
    } catch (error) {
        return res.status(500).json({ message: (error as Error).message });
    }
};

export const getAll = async (_req: Request, res: Response) => {
    try {
        const customer = await getAllCustomerService();
        return res.json(customer);
    } catch (error) {
        return res.status(500).json({ message: (error as Error).message });
    }
};

export const getById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const customer = await getCustomerByIdService(Number(id));
        if (!customer) return res.status(404).json({ message: 'Cliente no exite' });
        return res.json(customer);
    } catch (error) {
        return res.status(500).json({ message: (error as Error).message });
    }
};

export const updateById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { name, phone_number, landline, address, nit, dpi, email, customer_type_id, token_fcm } = req.body;
        const customer = await getCustomerByIdService(Number(id));
        if (!customer) return res.status(404).json({ message: 'Cliente no exite' });

        let customerType = null;
        if (customer_type_id) customerType = await getCustomerTypeByIdService(Number(customer_type_id));

        const update = await updateCustomerService(
            Number(id),
            {
                name,
                phone_number,
                landline,
                address,
                nit,
                dpi,
                email,
                customer_type_id,
                token_fcm
            },
            customer,
            customerType
        );
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

export const getPagination = async (req: Request, res: Response) => {
    try {
        const { pageSize = 100, current = 1, sortField = 'id', sortOrder = 'ASC', filter = '' } = req.body;

        // Validar que los valores recibidos sean correctos
        const validFields = ['id', 'name', 'dpi', 'nit', 'phone_number', 'email', 'type']; // Lista de campos válidos para ordenar
        if (!validFields.includes(sortField)) return res.status(203).json({ message: 'Campo de orden inválido' });

        const validDirections = ['ASC', 'DESC'];
        if (!validDirections.includes(sortOrder.toUpperCase())) return res.status(203).json({ message: 'Dirección de orden inválida' });

        const [data, total] = await paginationCustomerService(filter, sortField, sortOrder, Number(current), Number(pageSize));

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
