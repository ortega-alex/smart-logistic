import { TransportRate } from './entity/TransportRate';
import { OptionalTransportRate, TransportRate as TransportRateInterface } from './interface/TransportRate';

export const getAll = async () => await TransportRate.find();

export const getById = async (id: string) =>
    await TransportRate.findOne({
        where: { id },
        relations: {
            user: true,
            vehicleType: true,
            transportType: true,
            sede: true,
            customerType: true
        }
    });

export const save = async (transportRate: TransportRateInterface) => {
    const newTransportRate = new TransportRate();
    newTransportRate.rate = transportRate.rate;
    newTransportRate.is_active = transportRate.is_active ?? true;
    newTransportRate.user = transportRate.user;
    newTransportRate.vehicleType = transportRate.vehicleType;
    newTransportRate.transportType = transportRate.transportType;
    newTransportRate.sede = transportRate.sede;

    await newTransportRate.save();
    return newTransportRate;
};

export const update = async (id: string, transportRate: OptionalTransportRate) => await TransportRate.update({ id }, transportRate);
