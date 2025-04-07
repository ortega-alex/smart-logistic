import archiver from 'archiver';
import { Request, Response } from 'express';
import { getById as getAuctionByIdServices } from '../auction/auction.service';
import { getById as getCustomerByIdService } from '../customer/customer.service';
import { getById as getIssuingHeadquarterByIdService } from '../headquarter/headquarter.service';
import { getById as getTransportTypeByIdService } from '../transport-type/transport-type.service';
import { getById as getUserByIdService } from '../user/user.service';
import { commaSeparateNumber, createPdfWithTable, generateAttachmentPdf, unionEndPfd } from '../../utils';
import { getById as getVehicleTypeByIdService } from '../vehicle-type/vehicle-type.service';
import { Coin } from './interface/Quoter';
import QuoterService from './quoter.service';
import { Email } from '../../interfaces';
import { sendEmail } from '../../email';

export const getAll = async (_req: Request, res: Response) => {
    try {
        const quoters = await QuoterService.getAll();
        return res.json(quoters);
    } catch (error) {
        return res.status(500).json({ message: (error as Error).message });
    }
};

export const getById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const quoter = await QuoterService.getById(Number(id));
        if (!quoter) return res.status(404).json({ message: 'Cotización no existe' });

        return res.json(quoter);
    } catch (error) {
        return res.status(500).json({ message: (error as Error).message });
    }
};

export const add = async (req: Request, res: Response) => {
    try {
        const {
            mark,
            model,
            year,
            lot,
            vin,
            description,
            customer_id,
            user_id,
            seller_id,
            vehicle_type_id,
            transport_type_id,
            issuing_headquarter_id,
            headquarter_id,
            auction_id,
            details
        } = req.body;

        if (!mark) return res.status(203).json({ error: true, message: 'El marca es requerida' });
        if (!model) return res.status(203).json({ error: true, message: 'El modelo es requerido' });
        if (!year) return res.status(203).json({ error: true, message: 'El año es requerido' });
        if (!lot) return res.status(203).json({ error: true, message: 'La lote es requerida' });
        if (!vin) return res.status(203).json({ error: true, message: 'El VIN es requerido' });
        if (!customer_id) return res.status(203).json({ error: true, message: 'El cliente es requerido' });
        if (!user_id) return res.status(203).json({ error: true, message: 'El usuario es requerido' });
        if (!seller_id) return res.status(203).json({ error: true, message: 'El vendedor es requerido' });
        if (!vehicle_type_id) return res.status(203).json({ error: true, message: 'El tipo de vehiculo es requerido' });
        if (!transport_type_id) return res.status(203).json({ error: true, message: 'El tipo de transporte es requerido' });
        if (!issuing_headquarter_id) return res.status(203).json({ error: true, message: 'La sede GTO es requerida' });
        if (!headquarter_id) return res.status(203).json({ error: true, message: 'La sede USD es requerida' });

        const customer = await getCustomerByIdService(Number(customer_id));
        if (!customer) return res.status(203).json({ error: true, message: 'El cliente no existe' });

        const createdBy = await getUserByIdService(Number(user_id));
        if (!createdBy) return res.status(203).json({ error: true, message: 'El usuario no existe' });

        const seller = await getUserByIdService(Number(seller_id));
        if (!seller) return res.status(203).json({ error: true, message: 'El vendedor no existe' });

        const vehicleType = await getVehicleTypeByIdService(Number(vehicle_type_id));
        if (!vehicleType) return res.status(203).json({ error: true, message: 'El tipo de vehiculo no existe' });

        const transportType = await getTransportTypeByIdService(Number(transport_type_id));
        if (!transportType) return res.status(203).json({ error: true, message: 'El tipo de transporte no existe' });

        const issuingHeadquarter = await getIssuingHeadquarterByIdService(Number(issuing_headquarter_id));
        if (!issuingHeadquarter) return res.status(203).json({ error: true, message: 'La sede GTO no existe' });

        const headquarter = await getIssuingHeadquarterByIdService(Number(headquarter_id));
        if (!headquarter) return res.status(203).json({ error: true, message: 'La sede USD no existe' });

        let auction;
        if (auction_id) auction = await getAuctionByIdServices(Number(auction_id));

        const quoter = await QuoterService.add({
            mark,
            model,
            year,
            lot,
            vin,
            description,
            customer,
            createdBy,
            seller,
            vehicleType,
            transportType,
            issuingHeadquarter,
            headquarter,
            auction: auction ?? undefined
        });

        await QuoterService.addDetail(quoter, details);

        return res.json({ message: 'Cotización creada', data: quoter });
    } catch (error) {
        return res.status(500).json({ error: true, message: (error as Error).message });
    }
};

export const update = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const {
            mark,
            model,
            year,
            lot,
            vin,
            description,
            is_aproverd,
            is_active,
            customer_id,
            user_id,
            seller_id,
            vehicle_type_id,
            transport_type_id,
            issuing_headquarter_id,
            headquarter_id,
            auction_id,
            details
        } = req.body;

        const quoter = await QuoterService.getById(Number(id));
        if (!quoter) return res.status(203).json({ error: true, message: 'Cotización no existe' });

        let customer;
        if (customer_id) customer = await getCustomerByIdService(Number(customer_id));

        let createdBy;
        if (user_id) createdBy = await getUserByIdService(Number(user_id));

        let seller;
        if (seller_id) seller = await getUserByIdService(Number(seller_id));

        let vehicleType;
        if (vehicle_type_id) vehicleType = await getVehicleTypeByIdService(Number(vehicle_type_id));

        let transportType;
        if (transport_type_id) transportType = await getTransportTypeByIdService(Number(transport_type_id));

        let issuingHeadquarter;
        if (issuing_headquarter_id) issuingHeadquarter = await getIssuingHeadquarterByIdService(Number(issuing_headquarter_id));

        let headquarter;
        if (headquarter_id) headquarter = await getIssuingHeadquarterByIdService(Number(headquarter_id));

        let auction;
        if (auction_id) auction = await getAuctionByIdServices(Number(auction_id));

        const update = await QuoterService.update(Number(id), {
            mark: mark ?? quoter.mark,
            model: model ?? quoter.model,
            year: year ?? quoter.year,
            lot: lot ?? quoter.lot,
            vin: vin ?? quoter.vin,
            description: description ?? quoter.description,
            is_aproverd: is_aproverd ?? quoter.is_aproverd,
            is_active: is_active ?? quoter.is_active,
            customer: customer ?? quoter.customer,
            createdBy: createdBy ?? quoter.createdBy,
            seller: seller ?? quoter.seller,
            vehicleType: vehicleType ?? quoter.vehicleType,
            transportType: transportType ?? quoter.transportType,
            issuingHeadquarter: issuingHeadquarter ?? quoter.issuingHeadquarter,
            headquarter: headquarter ?? quoter.headquarter,
            auction: auction ?? quoter.auction
        });

        if ((update?.affected ?? 0) > 0) {
            if (!is_aproverd) {
                await QuoterService.deleteDetailByQuoterId(Number(id));
                await QuoterService.addDetail(quoter, details);
            } else {
                // setea a vehiculos la cotizacion aprobada
                //     const estado_importacion = await ImportState.findOneBy({ id_estado_importacion: 1 });
                //     if (!estado_importacion) return res.status(203).json({ message: 'estado de importacion no encontrado' });
                //     await newVehicle(quoter, estado_importacion);
            }
            return res.json({ message: 'Cotización actualizada correctamente' });
        }

        return res.status(203).json({ error: true, mesage: 'No se pudo actualizar la cotización' });
    } catch (error) {
        return res.status(500).json({ message: (error as Error).message });
    }
};

export const generatePdf = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        const quoter = await QuoterService.getById(Number(id));
        if (!quoter) return res.status(203).json({ message: 'Cotización no existe' });

        const attachments = await generateAttachmentPdf(quoter);
        if (attachments.length === 0) return res.status(203).json({ message: 'No hay archivos para descargar' });
        if (attachments.length === 1) {
            res.setHeader('Content-Type', 'application/pdf');
            res.setHeader('Content-Disposition', `attachment; filename="${attachments[0].filename}"`);
            return res.send(attachments[0].content);
        } else {
            const zip = archiver('zip', { zlib: { level: 9 } });
            res.setHeader('Content-Type', 'application/zip');
            res.setHeader('Content-Disposition', 'attachment; filename="cotizaciones.zip"');
            zip.pipe(res);
            for (const attachment of attachments) {
                zip.append(attachment.content, { name: attachment.filename });
            }
            zip.finalize();
        }
    } catch (error) {
        return res.status(500).json({ error: true, message: (error as Error).message });
    }
};

export const pagination = async (req: Request, res: Response) => {
    try {
        const { pageSize = 100, current = 1, sortField = 'id', sortOrder = 'ASC', filter = '' } = req.body;

        // Validar que los valores recibidos sean correctos
        const validFields = ['id', 'created_at', 'seller', 'customer', 'is_aproverd', 'customer_id']; // Lista de campos válidos para ordenar
        if (!validFields.includes(sortField)) return res.status(203).json({ message: 'Campo de orden inválido' });

        const validDirections = ['ASC', 'DESC'];
        if (!validDirections.includes(sortOrder.toUpperCase())) return res.status(203).json({ message: 'Dirección de orden inválida' });

        // Ejecutar la consulta
        const [data, total] = await QuoterService.pagination(filter, sortField, sortOrder, current, pageSize);

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

export const sendEmailCustomer = async (req: Request, res: Response) => {
    try {
        const { quoter_id, from, to, subject, body, sendAttachment } = req.body;

        if (!quoter_id) return res.status(203).json({ message: 'El id de cotizacion es requerido' });
        if (!subject) return res.status(203).json({ message: 'El asunto es requerido' });
        if (!body) return res.status(203).json({ message: 'El cuerpo es requerido' });

        const quoter = await QuoterService.getById(Number(quoter_id));
        if (!quoter) return res.status(203).json({ message: 'Cotización no existe' });

        let _to = to;
        if (!_to) {
            _to = quoter.customer.email;
            if (!_to) return res.status(203).json({ message: 'El destinatario es requerido' });
        }

        let attachments: any[] = [];
        if (sendAttachment) attachments = await generateAttachmentPdf(quoter);

        const newEmail: Email = {
            from,
            to: _to,
            subject,
            html: body,
            attachments
        };
        await sendEmail(newEmail);
        return res.json({ success: true, message: 'Email enviado correctamente' });
    } catch (error) {
        return res.status(500).json({ message: (error as Error).message });
    }
};

export default {
    getAll,
    getById,
    add,
    update,
    generatePdf,
    pagination,
    sendEmailCustomer
};
