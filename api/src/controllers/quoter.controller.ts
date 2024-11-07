import { Request, Response } from 'express';
import { Aution, Crane, Customer, Port, Quoter, TypeVehicle, User } from '../entities';
import { createPdfWithTable, unionEndPfd } from '../utils';

export const getQuoters = async (_req: Request, res: Response) => {
    try {
        const quoter = await Quoter.find({
            relations: {
                cliente: true,
                vendedor: true,
                tipo_veniculo: true,
                puerto: true,
                grua_usd: true,
                grua_gt: true,
                subasta: true
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
            costos,
            serie,
            vin
        } = req.body;
        req.body;
        if (!id_cliente) return res.status(203).json({ message: 'El cliente es requerido' });
        if (!id_vendedor) return res.status(203).json({ message: 'El vendedor es requerido' });
        if (!id_tipo_vehiculo) return res.status(203).json({ message: 'El tipo de vehiculo es requerido' });
        if (!marca) return res.status(203).json({ message: 'La marca es requerida' });
        if (!modelo) return res.status(203).json({ message: 'El modelo es requerido' });
        if (!anio) return res.status(203).json({ message: 'El año es requerido' });
        if (!costos) return res.status(203).json({ message: 'Los costos son requeridos' });
        if (!serie) return res.status(203).json({ message: 'La serie es requerida' });
        if (!vin) return res.status(203).json({ message: 'El VIN es requerido' });

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
        quoter.costos = costos;
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
            costos,
            serie,
            vin
        } = req.body;

        const quoter = await Quoter.findOneBy({ id_cotizacion: Number(id) });
        if (!quoter) return res.status(203).json({ message: 'Cotización no existe' });

        const customer = await Customer.findOneBy({ id_cliente: Number(id_cliente) });
        if (!customer) return res.status(203).json({ message: 'Cliente no existe' });

        const typeVehicle = await TypeVehicle.findOneBy({ id_tipo_vehiculo: Number(id_tipo_vehiculo) });
        if (!typeVehicle) return res.status(203).json({ message: 'Tipo de vehiculo no existe' });

        const port = await Port.findOneBy({ id_puerto: Number(id_puerto) });
        if (!port) return res.status(203).json({ message: 'Puerto no existe' });

        const trader = await User.findOneBy({ id_usuario: Number(id_vendedor) });
        if (!trader) return res.status(203).json({ message: 'Vendedor no existe' });

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
                costos: costos ?? quoter.costos,
                marca: marca ?? quoter.marca,
                modelo: modelo ?? quoter.modelo,
                anio: anio ?? quoter.anio,
                serie: serie ?? quoter.serie,
                vin: vin ?? quoter.vin
            }
        );

        if ((update?.affected ?? 0) > 0) return res.json(quoter);

        return res.status(203).json({ message: 'No se pudo actualizar la cotización' });
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
                vendedor: true
                // tipo_vehiculo: true,
                // puerto: true,
                // grua_usd: true,
                // grua_gt: true,
                // subasta: true
            }
        });
        if (!quoter) return res.status(203).json({ message: 'Cotización no existe' });

        const costos = quoter.costos?.map(item => [item.nombre, item.valor]);
        const total = quoter.costos?.reduce((acum, item) => acum + Number(String(item.valor).replace(/,/g, '')), 0);

        // Crear PDF con tabla
        const tablePdfDoc = await createPdfWithTable(quoter, [['CONCEPTO', 'VALOR'], ...(<[]>costos), ['TOTAL', String(total)]]);

        const pdfBytes = await unionEndPfd(tablePdfDoc);

        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', `attachment; filename=${quoter.cliente?.cliente ?? 'cotizacion'}.pdf`);
        res.send(Buffer.from(pdfBytes));

        // res.json({ message: 'PDF generado' });
    } catch (error) {
        return res.status(500).json({ message: (error as Error).message });
    }
};
