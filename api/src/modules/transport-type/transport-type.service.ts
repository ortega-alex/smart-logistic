import { TransportType } from './entity/TransportType';
import { TransportType as TransportTypeInterface } from './interface/TransportType';

export const getAll = async () => TransportType.find();

export const getById = async (id: number) => TransportType.findOneBy({ id });

export const add = async (transportType: TransportTypeInterface) => {
    const newTransportType = new TransportType();
    newTransportType.name = transportType.name;
    newTransportType.is_active = transportType.is_active ?? true;
    await newTransportType.save();
    return newTransportType;
};

export const update = async (id: number, transportType: TransportTypeInterface) =>
    await TransportType.update({ id: Number(id) }, transportType);

export default {
    getAll,
    getById,
    add,
    update
};
