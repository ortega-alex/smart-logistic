import { Request, Response } from 'express';
import { Customer, CustomerFile, TypeOfCustomer } from '../entities';
import { enviroment } from '../utils';

export const addCustomer = async (req: Request, res: Response) => {
    try {
        const { cliente, telefono_celular, telefono_fijo, direccion, nit, dpi, correo, id_tipo_cliente } = req.body;
        if (!cliente) return res.status(203).json({ message: 'El cliente es requerido' });
        if (!telefono_celular) return res.status(203).json({ message: 'El telefono celular es requerido' });
        if (!direccion) return res.status(203).json({ message: 'La direccion es requerida' });
        if (!nit) return res.status(203).json({ message: 'El nit es requerido' });
        if (!dpi) return res.status(203).json({ message: 'El dpi es requerido' });
        if (!correo) return res.status(203).json({ message: 'El correo es requerido' });
        if (!id_tipo_cliente) return res.status(203).json({ message: 'El tipo de cliente es requerido' });

        const typeOfCustomer = await TypeOfCustomer.findOneBy({ id_tipo_cliente });
        if (!typeOfCustomer) return res.status(404).json({ message: 'Tipo de cliente no encontrado' });

        const customer = new Customer();
        customer.cliente = cliente;
        customer.telefono_celular = telefono_celular;
        if (telefono_fijo) customer.telefono_fijo = telefono_fijo;
        customer.direccion = direccion;
        customer.nit = nit;
        customer.dpi = dpi;
        customer.correo = correo;
        customer.tipo_cliente = typeOfCustomer;

        await customer.save();

        const files = req.files as Express.Multer.File[];
        if (files.length > 0) {
            files.forEach(item => {
                const customerFile = new CustomerFile();
                customerFile.cliente = customer;
                customerFile.nombre = item.originalname;
                customerFile.ruta = `${enviroment.URI_FILE}/${item.filename}`;
                customerFile.save();
            });
        }

        res.json(customer);
    } catch (error) {
        return res.status(500).json({ message: (error as Error).message });
    }
};

export const getCustomer = async (_req: Request, res: Response) => {
    try {
        const customer = await Customer.find({
            relations: {
                tipo_cliente: true
            }
        });
        return res.json(customer);
    } catch (error) {
        return res.status(500).json({ message: (error as Error).message });
    }
};

export const getCustomerById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const customer = await Customer.findOne({
            where: { id_cliente: Number(id) },
            relations: {
                tipo_cliente: true,
                archivos: true
            }
        });
        if (!customer) return res.status(404).json({ message: 'Cliente no exite' });
        return res.json(customer);
    } catch (error) {
        return res.status(500).json({ message: (error as Error).message });
    }
};

export const updateCustomerById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { cliente, telefono_celular, telefono_fijo, direccion, nit, dpi, correo, id_tipo_cliente } = req.body;
        const customer = await Customer.findOneBy({ id_cliente: Number(id) });
        if (!customer) return res.status(404).json({ message: 'Cliente no exite' });

        const typeOfCustomer = await TypeOfCustomer.findOneBy({ id_tipo_cliente });
        if (!typeOfCustomer) return res.status(404).json({ message: 'Tipo de cliente no encontrado' });

        const update = await Customer.update(
            { id_cliente: Number(id) },
            {
                cliente: cliente ?? customer.cliente,
                telefono_celular: telefono_celular ?? customer.telefono_celular,
                telefono_fijo: telefono_fijo ?? customer.telefono_fijo,
                direccion: direccion ?? customer.direccion,
                nit: nit ?? customer.nit,
                dpi: dpi ?? customer.dpi,
                correo: correo ?? customer.correo,
                tipo_cliente: typeOfCustomer
            }
        );

        if ((update?.affected ?? 0) > 0) {
            const files = req.files as Express.Multer.File[];
            if (files.length > 0) {
                files.forEach(item => {
                    const customerFile = new CustomerFile();
                    customerFile.cliente = customer;
                    customerFile.nombre = item.originalname;
                    customerFile.ruta = `${enviroment.URI_FILE}/${item.filename}`;
                    customerFile.save();
                });
            }

            return res.json(customer);
        }
        return res.status(203).json({ message: 'No se pudo actualizar el cliente' });
    } catch (error) {
        return res.status(500).json({ message: (error as Error).message });
    }
};
