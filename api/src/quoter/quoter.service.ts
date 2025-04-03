import { Quoter } from './entity/Quoter';
import { QuoterDetail } from './entity/QuoterDetail';
import { OptionalQuoter, QuoterDetail as QuoterDetailInterface, Quoter as QuoterInterface } from './interface/Quoter';

export const getAll = async () => await Quoter.find();

export const getById = async (id: number) =>
    await Quoter.findOne({
        where: { id },
        relations: {
            customer: true,
            seller: true,
            createdBy: true,
            vehicleType: true,
            transportType: true,
            issuingHeadquarter: true,
            headquarter: true,
            auction: true,
            details: true
        }
    });

export const pagination = async (filter: string, sortField: string, sortOrder: string, current: number, pageSize: number) => {
    // Crear la consulta base
    const query = Quoter.createQueryBuilder('quoter')
        .leftJoinAndSelect('quoter.customer', 'customer')
        .leftJoinAndSelect('quoter.seller', 'seller');

    // Aplicar filtro si es necesario
    if (filter != '') {
        if (isNaN(Number(filter))) {
            query
                .where('quoter.created_at LIKE :filter', { filter: `%${filter}%` })
                .orWhere('seller.name LIKE :filter', { filter: `%${filter}%` })
                .orWhere('customer.name LIKE :filter', { filter: `%${filter}%` });
        } else {
            query.where('customer.id = :id', { id: Number(filter) });
        }
    }

    if (sortField.includes('customer')) query.orderBy(`customer.${sortField}`, sortOrder.toUpperCase() as 'ASC' | 'DESC');
    else if (sortField.includes('seller')) query.orderBy(`seller.name`, sortOrder.toUpperCase() as 'ASC' | 'DESC');
    else query.orderBy(`quoter.${sortField}`, sortOrder.toUpperCase() as 'ASC' | 'DESC');

    // Aplicar paginación
    query.skip((current - 1) * pageSize).take(pageSize);

    // Ejecutar la consulta
    return await query.getManyAndCount();
};

export const add = async (quoter: QuoterInterface) => {
    const newQuoter = new Quoter();
    newQuoter.mark = quoter.mark;
    newQuoter.model = quoter.model;
    newQuoter.year = quoter.year;
    newQuoter.lot = quoter.lot;
    newQuoter.vin = quoter.vin;
    newQuoter.description = quoter.description ?? '';
    newQuoter.customer = quoter.customer;
    newQuoter.createdBy = quoter.createdBy;
    newQuoter.seller = quoter.seller;
    newQuoter.vehicleType = quoter.vehicleType;
    newQuoter.transportType = quoter.transportType;
    newQuoter.issuingHeadquarter = quoter.issuingHeadquarter;
    newQuoter.headquarter = quoter.headquarter;
    if (quoter.auction) newQuoter.auction = quoter.auction;

    await newQuoter.save();
    return newQuoter;
};

export const update = async (id: number, quoter: OptionalQuoter) => await Quoter.update({ id }, quoter);

export const insertDetail = async (quoter: Quoter, details: Array<QuoterDetailInterface>) => {
    return details.map(async item => {
        const quoterDetail = new QuoterDetail();

        quoterDetail.quoter = quoter;
        quoterDetail.name = item.name;
        quoterDetail.value = Number(String(item.value).replace(/,/g, '') ?? 0);
        quoterDetail.coin = item.coin;

        await quoterDetail.save();
        return quoterDetail;
    });
};

export const deleteDetailByQuoterId = async (id: number) =>
    await QuoterDetail.createQueryBuilder().delete().where({ quoter: { id } }).execute();
