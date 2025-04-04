import { TransportRate } from './entity/TransportRate';
import { FilterIds, OptionalTransportRate, TransportRateFilter, TransportRate as TransportRateInterface } from './interface/TransportRate';

export const getAll = async () =>
    await TransportRate.find({ relations: { vehicleType: true, transportType: true, headquarter: true, customerType: true } });

export const getById = async (id: string) =>
    await TransportRate.findOne({
        where: { id },
        relations: {
            user: true,
            vehicleType: true,
            transportType: true,
            headquarter: true,
            customerType: true
        }
    });

export const getByIds = async (ids: FilterIds) =>
    await TransportRate.findOne({
        where: {
            vehicleType: { id: ids.vehicle_type_id },
            transportType: { id: ids.transport_type_id },
            headquarter: { id: ids.headquarter_id },
            customerType: { id: ids.customer_type_id }
        }
    });

export const getRateFiler = async (transportRateFiler: TransportRateFilter) =>
    await TransportRate.findOne({
        where: {
            customerType: { id: transportRateFiler.customer_type_id },
            transportType: { id: transportRateFiler.transport_type_id },
            vehicleType: { id: transportRateFiler.vehicle_type_id },
            headquarter: { id: transportRateFiler.headquarter_id }
        }
    });

export const add = async (transportRate: TransportRateInterface) => {
    const newTransportRate = new TransportRate();
    newTransportRate.rate = transportRate.rate;
    newTransportRate.is_active = transportRate.is_active ?? true;
    newTransportRate.user = transportRate.user;
    newTransportRate.vehicleType = transportRate.vehicleType;
    newTransportRate.transportType = transportRate.transportType;
    newTransportRate.headquarter = transportRate.headquarter;
    newTransportRate.customerType = transportRate.customerType;

    await newTransportRate.save();
    return newTransportRate;
};

export const update = async (id: string, transportRate: OptionalTransportRate) => await TransportRate.update({ id }, transportRate);

export const deleteById = async (id: string) => await TransportRate.delete({ id });

export default {
    getAll,
    getById,
    getByIds,
    getRateFiler,
    add,
    update,
    deleteById
};
