import { Vehicle } from './entity/Vehicle';
import { Vehicle as VehicleInterface, OptionalVehicle } from './interface/Vehicle';

export const getAll = async () => await Vehicle.find();

export const getById = async (id: number) =>
    await Vehicle.getRepository()
        .createQueryBuilder('vehicle')
        .leftJoinAndSelect('vehicle.quoter', 'quoter')
        .leftJoinAndSelect('quoter.customer', 'customer')
        .leftJoinAndSelect('quoter.seller', 'seller')
        .leftJoinAndSelect('quoter.vehicleType', 'vehicleType')
        .leftJoinAndSelect('quoter.transportType', 'transportType')
        .leftJoinAndSelect('quoter.issuingHeadquarter', 'issuingHeadquarter')
        .leftJoinAndSelect('quoter.headquarter', 'headquarter')
        .leftJoinAndSelect('quoter.auction', 'auction')
        .leftJoinAndSelect('quoter.details', 'details')
        .leftJoinAndSelect('vehicle.importState', 'importState')
        .leftJoinAndSelect('vehicle.record', 'record')
        .where('vehicle.id = :id', { id: Number(id) })
        .orderBy('record.created_at', 'DESC')
        .getOne();

export const getByCustomerId = async (id: number) =>
    await Vehicle.getRepository()
        .createQueryBuilder('vehicle')
        .innerJoinAndSelect('vehicle.quoter', 'quoter')
        .innerJoinAndSelect('vehicle.importState', 'importState')
        .where('quoter.customer.id = :id', { id: Number(id) })
        .orderBy('vehicle.created_at', 'DESC')
        .getMany();

export const pagination = async (filter: string, sortField: string, sortOrder: string, current: number, pageSize: number) => {
    const query = Vehicle.createQueryBuilder('vehicle')
        .innerJoinAndSelect('vehicle.quoter', 'quoter')
        .innerJoinAndSelect('vehicle.importState', 'importState')
        .innerJoinAndSelect('quoter.customer', 'customer')
        .innerJoinAndSelect('quoter.seller', 'seller')
        .innerJoinAndSelect('quoter.headquarter', 'headquarter')
        .innerJoinAndSelect('quoter.transportType', 'transportType');

    if (filter != '') {
        if (isNaN(Number(filter))) {
            query
                .where('vehicle.created_at LIKE :filter', { filter: `%${filter}%` })
                .orWhere('quoter.lot LIKE :filter', { filter: `%${filter}%` })
                .orWhere('customer.name LIKE :filter', { filter: `%${filter}%` })
                .orWhere('seller.name LIKE :filter', { filter: `%${filter}%` })
                .orWhere('importState.name LIKE :filter', { filter: `%${filter}%` })
                .orWhere('headquarter.name LIKE :filter', { filter: `%${filter}%` })
                .orWhere('transportType.name LIKE :filter', { filter: `%${filter}%` });
        } else {
            query
                .where('customer.id = :id', { id: Number(filter) })
                .orWhere('quoter.id = :id', { id: Number(filter) })
                .orWhere('importState.id = :id', { id: Number(filter) })
                .orWhere('headquarter.id = :id', { id: Number(filter) })
                .orWhere('transportType.id = :id', { id: Number(filter) });
        }
    }

    if (sortField.includes('customer')) query.orderBy(`customer.name`, sortOrder.toUpperCase() as 'ASC' | 'DESC');
    else if (sortField.includes('lot')) query.orderBy(`quoter.lot`, sortOrder.toUpperCase() as 'ASC' | 'DESC');
    else if (sortField.includes('seller')) query.orderBy(`seller.name`, sortOrder.toUpperCase() as 'ASC' | 'DESC');
    else if (sortField.includes('importState')) query.orderBy(`importState.name`, sortOrder.toUpperCase() as 'ASC' | 'DESC');
    else if (sortField.includes('headquarter')) query.orderBy(`headquarter.name`, sortOrder.toUpperCase() as 'ASC' | 'DESC');
    else if (sortField.includes('transportType')) query.orderBy(`transportType.name`, sortOrder.toUpperCase() as 'ASC' | 'DESC');
    else query.orderBy(`vehicle.${sortField}`, sortOrder.toUpperCase() as 'ASC' | 'DESC');

    query.skip((current - 1) * pageSize).take(pageSize);

    return await query.getManyAndCount();
};

export const add = async (vehicle: VehicleInterface) => {
    const newVehicle = new Vehicle();

    newVehicle.quoter = vehicle.quoter;
    newVehicle.importState = vehicle.importState;

    const result = await newVehicle.save();
    return result;
};

export const update = async (id: number, vehicle: OptionalVehicle) => await Vehicle.update({ id }, vehicle);
