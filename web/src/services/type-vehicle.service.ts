import { TypeVehicle } from '@/models';
import { httpRequest } from '@/utilities';

const path = '/type-vehicle';

export const httpGetTypeVehicles = async () =>
    await httpRequest({
        path,
        method: 'GET'
    });

export const httpAddTypeVehicle = async (data: TypeVehicle) =>
    await httpRequest({
        path,
        method: 'POST',
        data
    });

export const httpUpdateTypeVehicle = async (data: TypeVehicle) =>
    await httpRequest({
        path: `${path}/${data.id_tipo_vehiculo}`,
        method: 'PUT',
        data
    });
