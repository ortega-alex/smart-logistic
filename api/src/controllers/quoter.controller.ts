import { Request, Response } from 'express';
import { Aution, Crane, Customer, Port, Quoter, QuoterDetail, TypeVehicle, User } from '../entities';
import { commaSeparateNumber, createPdfWithTable, unionEndPfd } from '../utils';
import archiver from 'archiver';

const validate = (data: any) => {
    const errors: any = {};
    if (!data.id_cliente) errors.id_cliente = 'El cliente es requerido';
    if (!data.id_vendedor) errors.id_vendedor = 'El vendedor es requerido';
    if (!data.id_tipo_vehiculo) errors.id_tipo_vehiculo = 'El tipo de vehiculo es requerido';
    if (!data.marca) errors.marca = 'La marca es requerida';
    if (!data.modelo) errors.modelo = 'El modelo es requerido';
    if (!data.anio) errors.anio = 'El año es requerido';
    if (!data.detalles) errors.detalles = 'Los costos son requeridos';
    if (!data.serie) errors.serie = 'La serie es requerida';
    if (!data.vin) errors.vin = 'El VIN es requerido';
    return errors;
};

const insertDetail = async (quoter: Quoter, detalles: any) => {
    return detalles?.map(async (item: any) => {
        const quoterDetail = new QuoterDetail();

        quoterDetail.quoter = quoter;
        quoterDetail.nombre = item.nombre;
        quoterDetail.valor = Number(String(item.valor).replace(/,/g, '') ?? 0);
        quoterDetail.moneda = item.moneda;

        await quoterDetail.save();
        return quoterDetail;
    });
};

export const getQuoters = async (_req: Request, res: Response) => {
    try {
        const quoter = await Quoter.find({
            relations: {
                cliente: true,
                vendedor: true
            }
        });
        if (!quoter) return res.status(404).json({ message: 'Cotización no existe' });

        return res.json(quoter);
    } catch (error) {
        return res.status(500).json({ message: (error as Error).message });
    }
};

export const getQuotersById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const quoter = await Quoter.findOne({
            where: { id_cotizacion: Number(id) },
            relations: {
                cliente: true,
                vendedor: true,
                tipo_veniculo: true,
                puerto: true,
                grua_usd: true,
                grua_gt: true,
                subasta: true,
                details: true
            }
        });
        if (!quoter) return res.status(404).json({ message: 'Cotización no existe' });

        return res.json(quoter);
    } catch (error) {
        return res.status(500).json({ message: (error as Error).message });
    }
};

export const addQuoter = async (req: Request, res: Response) => {
    try {
        const {
            id_cliente,
            id_vendedor,
            id_tipo_vehiculo,
            marca,
            modelo,
            anio,
            id_puerto,
            id_subasta,
            id_grua_usd,
            id_grua_gt,
            detalles,
            serie,
            vin
        } = req.body;
        req.body;

        const errors = validate(req.body);
        if (Object.keys(errors).length > 0) return res.status(203).json({ message: errors });

        const customer = await Customer.findOneBy({ id_cliente: Number(id_cliente) });
        if (!customer) return res.status(203).json({ message: 'Cliente no existe' });

        const trader = await User.findOneBy({ id_usuario: Number(id_vendedor) });
        if (!trader) return res.status(203).json({ message: 'Vendedor no existe' });

        const typeVehicle = await TypeVehicle.findOneBy({ id_tipo_vehiculo: Number(id_tipo_vehiculo) });
        if (!typeVehicle) return res.status(203).json({ message: 'Tipo de vehiculo no existe' });

        const port = await Port.findOneBy({ id_puerto: Number(id_puerto) });
        if (!port) return res.status(203).json({ message: 'Puerto no existe' });

        let aution = null;
        if (id_subasta) {
            aution = await Aution.findOneBy({ id_subasta: Number(id_subasta) });
            if (!aution) return res.status(203).json({ message: 'Subasta no existe' });
        }

        let crane_usd = null;
        if (id_grua_usd) {
            crane_usd = await Crane.findOneBy({ id_grua: Number(id_grua_usd) });
            if (!crane_usd) return res.status(203).json({ message: 'Grua USD no existe' });
        }

        let crane_gt = null;
        if (id_grua_gt) {
            crane_gt = await Crane.findOneBy({ id_grua: Number(id_grua_gt) });
            if (!crane_gt) return res.status(203).json({ message: 'Grua GT no existe' });
        }

        const quoter = new Quoter();
        quoter.marca = marca;
        quoter.modelo = modelo;
        quoter.anio = anio;
        quoter.serie = serie;
        quoter.vin = vin;
        quoter.cliente = customer;
        quoter.puerto = port; // @ts-ignore
        quoter.vendedor = trader; // @ts-ignore
        quoter.subasta = aution; // @ts-ignore
        quoter.tipo_veniculo = typeVehicle; // @ts-ignore
        quoter.grua_usd = crane_usd; // @ts-ignore
        quoter.grua_gt = crane_gt;

        await quoter.save();
        await insertDetail(quoter, detalles);

        return res.json(quoter);
    } catch (error) {
        return res.status(500).json({ message: (error as Error).message });
    }
};

export const updateQuoter = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const {
            id_cliente,
            id_vendedor,
            id_tipo_vehiculo,
            marca,
            modelo,
            anio,
            id_puerto,
            id_subasta,
            id_grua_usd,
            id_grua_gt,
            detalles,
            serie,
            vin,
            aprobada = false
        } = req.body;

        const quoter = await Quoter.findOneBy({ id_cotizacion: Number(id) });
        if (!quoter) return res.status(203).json({ message: 'Cotización no existe' });

        const customer = await Customer.findOneBy({ id_cliente: id_cliente });
        if (!customer) return res.status(203).json({ message: 'Cliente no existe' });

        const typeVehicle = await TypeVehicle.findOneBy({ id_tipo_vehiculo: id_tipo_vehiculo });
        if (!typeVehicle) return res.status(203).json({ message: 'Tipo de vehiculo no existe' });

        const port = await Port.findOneBy({ id_puerto: id_puerto });
        if (!port) return res.status(203).json({ message: 'Puerto no existe' });

        const trader = await User.findOneBy({ id_usuario: id_vendedor });
        if (!trader) return res.status(203).json({ message: 'Vendedor no existe' });

        let aution = null;
        if (id_subasta) {
            aution = await Aution.findOneBy({ id_subasta: id_subasta });
            if (!aution) return res.status(203).json({ message: 'Subasta no existe' });
        }

        let crane_usd = null;
        if (id_grua_usd) {
            crane_usd = await Crane.findOneBy({ id_grua: id_grua_usd });
            if (!crane_usd) return res.status(203).json({ message: 'Grua USD no existe' });
        }

        let crane_gt = null;
        if (id_grua_gt) {
            crane_gt = await Crane.findOneBy({ id_grua: id_grua_gt });
            if (!crane_gt) return res.status(203).json({ message: 'Grua GT no existe' });
        }

        const update = await Quoter.update(
            { id_cotizacion: Number(id) },
            {
                cliente: customer ?? quoter.cliente,
                vendedor: trader ?? quoter.vendedor,
                tipo_veniculo: typeVehicle ?? quoter.tipo_veniculo,
                puerto: port ?? quoter.puerto,
                subasta: aution ?? quoter.subasta,
                grua_usd: crane_usd ?? quoter.grua_usd,
                grua_gt: crane_gt ?? quoter.grua_gt,
                marca: marca ?? quoter.marca,
                modelo: modelo ?? quoter.modelo,
                anio: anio ?? quoter.anio,
                serie: serie ?? quoter.serie,
                vin: vin ?? quoter.vin,
                aprobada: aprobada ?? quoter.aprobada
            }
        );

        if (!aprobada) {
            await QuoterDetail.createQueryBuilder().delete().where({ quoter: quoter }).execute();
            await insertDetail(quoter, detalles);

            if ((update?.affected ?? 0) > 0) return res.json(quoter);
            return res.status(203).json({ message: 'No se pudo actualizar la cotización' });
        } else {
            if ((update?.affected ?? 0) > 0) return res.json({ message: 'Cotización aprobada' });
            return res.status(203).json({ error: true, message: 'No se pudo aprobar la cotización' });
        }
    } catch (error) {
        return res.status(500).json({ message: (error as Error).message });
    }
};

export const generatePdf = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const quoter = await Quoter.findOne({
            where: { id_cotizacion: Number(id) },
            relations: {
                cliente: true,
                vendedor: true,
                details: true
            }
        });
        if (!quoter) return res.status(203).json({ message: 'Cotización no existe' });

        const dollars = quoter.details?.filter(item => item.moneda === '$');
        const quetzales = quoter.details?.filter(item => item.moneda === 'Q');

        const zip = archiver('zip', { zlib: { level: 9 } });

        if (dollars.length > 0) {
            const detail_dollars = dollars?.map(item => [item.nombre, `${item.moneda}. ${commaSeparateNumber(item.valor)}`]);
            const total_dollars = dollars?.reduce((acum, item) => acum + Number(String(item.valor).replace(/,/g, '')), 0);
            const tablePdfDoc = await createPdfWithTable(quoter, [
                ['CONCEPTO', 'VALOR'],
                ...(<[]>detail_dollars),
                ['TOTAL', `$. ${commaSeparateNumber(total_dollars)}`]
            ]);
            const pdfBytes = await unionEndPfd(tablePdfDoc);
            zip.append(Buffer.from(pdfBytes), { name: `${quoter.cliente?.cliente ?? 'cotizacion'}-dolares.pdf` });
        }

        if (quetzales.length > 0) {
            const detail_quetzales = quetzales?.map(item => [item.nombre, `${item.moneda}. ${commaSeparateNumber(item.valor)}`]);
            const total_quetzales = quetzales?.reduce((acum, item) => acum + Number(String(item.valor).replace(/,/g, '')), 0);
            const tablePdfDoc = await createPdfWithTable(quoter, [
                ['CONCEPTO', 'VALOR'],
                ...(<[]>detail_quetzales),
                ['TOTAL', `Q. ${commaSeparateNumber(total_quetzales)}`]
            ]);
            const pdfBytes = await unionEndPfd(tablePdfDoc);
            zip.append(Buffer.from(pdfBytes), { name: `${quoter.cliente?.cliente ?? 'cotizacion'}-quetzales.pdf` });
        }

        res.setHeader('Content-Type', 'application/zip');
        res.setHeader('Content-Disposition', 'attachment; filename="cotizaciones.zip"');

        zip.pipe(res);
        zip.finalize();
    } catch (error) {
        return res.status(500).json({ message: (error as Error).message, res: 'papas' });
    }
};

export const getQuoterPaginatedData = async (req: Request, res: Response) => {
    try {
        const { pageSize = 100, current = 1, sortField = 'id_cotizacion', sortOrder = 'ASC', filter = '' } = req.body;

        // Validar que los valores recibidos sean correctos
        const validFields = ['id_cotizacion', 'fecha_creacion', 'vendedor', 'cliente', 'aprobada', 'id_cliente']; // Lista de campos válidos para ordenar
        if (!validFields.includes(sortField)) return res.status(203).json({ message: 'Campo de orden inválido' });

        const validDirections = ['ASC', 'DESC'];
        if (!validDirections.includes(sortOrder.toUpperCase())) return res.status(203).json({ message: 'Dirección de orden inválida' });

        // Crear la consulta base
        const query = Quoter.createQueryBuilder('quoter')
            .leftJoinAndSelect('quoter.cliente', 'cliente')
            .leftJoinAndSelect('quoter.vendedor', 'vendedor');

        // Aplicar filtro si es necesario
        if (filter != '') {
            if (isNaN(Number(filter))) {
                query
                    .where('quoter.fecha_creacion LIKE :filter', { filter: `%${filter}%` })
                    .orWhere('vendedor.nombre LIKE :filter', { filter: `%${filter}%` })
                    .orWhere('cliente.cliente LIKE :filter', { filter: `%${filter}%` });
            } else {
                query.where('cliente.id_cliente = :id', { id: Number(filter) });
            }
        }

        if (sortField.includes('cliente')) query.orderBy(`cliente.${sortField}`, sortOrder.toUpperCase() as 'ASC' | 'DESC');
        else if (sortField.includes('vendedor')) query.orderBy(`vendedor.nombre`, sortOrder.toUpperCase() as 'ASC' | 'DESC');
        else query.orderBy(`quoter.${sortField}`, sortOrder.toUpperCase() as 'ASC' | 'DESC');

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
    } catch (error) {
        return res.status(500).json({ message: (error as Error).message });
    }
};
