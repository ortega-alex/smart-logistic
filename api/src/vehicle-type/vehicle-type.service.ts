import { VehicleType } from './entity/VehicleType';
import { VehicleType as VehicleTypeInterface } from './interface/VehicleType';

export const getAll = async () => await VehicleType.find();

export const getById = async (id: number) => await VehicleType.findOneBy({ id });

export const save = async (typeVehicle: VehicleTypeInterface) => {
    const newTypeVehicle = new VehicleType();
    newTypeVehicle.name = typeVehicle.name;
    newTypeVehicle.is_active = typeVehicle.is_active ?? true;
    await newTypeVehicle.save();
    return newTypeVehicle;
};

export const update = async (id: number, typeVehicle: VehicleTypeInterface) => await VehicleType.update({ id: Number(id) }, typeVehicle);
