import { VehicleType } from '@/interfaces';
import { httpRequest } from '@/utilities';

const path = '/vehicle-type';

export const httpGetAllVehicleType = async () =>
    await httpRequest({
        path,
        method: 'GET'
    });

export const httpAddVehicleType = async (data: VehicleType) =>
    await httpRequest({
        path,
        method: 'POST',
        data
    });

export const httpUpdateVehicleType = async (data: VehicleType) =>
    await httpRequest({
        path: `${path}/${data.id}`,
        method: 'PUT',
        data
    });
