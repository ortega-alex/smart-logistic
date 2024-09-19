import { Request, Response } from 'express';
import { Customer, CustomerFile, TypeOfCustomer } from '../entities';
import { enviroment } from '../utils';

export const addCustomer = async (req: Request, res: Response) => {
    try {
        const { cliente, telefono_celular, telefono_fijo, direccion, nit, dpi, correo, id_tipo_cliente, porcentaje_descuento } = req.body;
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
        customer.porcentaje_descuento = porcentaje_descuento ?? 0;

        await customer.save();

        const files = req.files as Express.Multer.File[];
        if (files) {
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
        const { cliente, telefono_celular, telefono_fijo, direccion, nit, dpi, correo, id_tipo_cliente, porcentaje_descuento } = req.body;
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
                tipo_cliente: typeOfCustomer,
                porcentaje_descuento: porcentaje_descuento ?? customer.porcentaje_descuento
            }
        );

        if ((update?.affected ?? 0) > 0) {
            const files = req.files as Express.Multer.File[];
            if (files) {
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

export const getCustomerPaginatedData = async (req: Request, res: Response) => {
    try {
        const { pageSize = 100, current = 1, sortField = 'id_cliente', sortOrder = 'ASC', filter = '' } = req.body;

        // Validar que los valores recibidos sean correctos
        const validFields = ['id_cliente', 'cliente', 'dpi', 'nit', 'telefono_celular', 'correo', 'tipo_cliente']; // Lista de campos válidos para ordenar
        if (!validFields.includes(sortField)) return res.status(203).json({ message: 'Campo de orden inválido' });

        const validDirections = ['ASC', 'DESC'];
        if (!validDirections.includes(sortOrder.toUpperCase())) return res.status(203).json({ message: 'Dirección de orden inválida' });

        // Crear la consulta base
        const query = Customer.createQueryBuilder('cliente').leftJoinAndSelect('cliente.tipo_cliente', 'tipo_cliente');

        // Aplicar filtro si es necesario
        if (filter != '') {
            query
                .where('cliente.cliente LIKE :filter', { filter: `%${filter}%` })
                .orWhere('cliente.dpi LIKE :filter', { filter: `%${filter}%` })
                .orWhere('cliente.nit LIKE :filter', { filter: `%${filter}%` })
                .orWhere('cliente.telefono_celular LIKE :filter', { filter: `%${filter}%` })
                .orWhere('cliente.correo LIKE :filter', { filter: `%${filter}%` })
                .orWhere('tipo_cliente.tipo_cliente LIKE :filter', { filter: `%${filter}%` });
        }

        if (sortField.includes('tipo_cliente')) {
            query.orderBy(`tipo_cliente.${sortField}`, sortOrder.toUpperCase() as 'ASC' | 'DESC');
        } else {
            query.orderBy(`cliente.${sortField}`, sortOrder.toUpperCase() as 'ASC' | 'DESC');
        }

        // Aplicar paginación
        query.skip((current - 1) * pageSize).take(pageSize);

        // Ejecutar la consulta
        const [data, total] = await query.getManyAndCount();

        // Retornar los datos paginados
        return res.status(200).json({
            data,
            total,
            current: Number(current),
            pageSize: Number(pageSize),
            totalPages: Math.ceil(total / pageSize)
        });

        return res.json({});
    } catch (error) {
        return res.status(500).json({ message: (error as Error).message });
    }
};
