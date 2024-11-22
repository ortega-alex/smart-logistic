import { httpRequest } from '@/utilities';

const path = '/vehicles';

export const httpGetVehiclesPagination = async (data: any) => await httpRequest({ path: `${path}/pagination`, method: 'POST', data });

export const httpGetVehiclesGetById = async (id: number) => await httpRequest({ path: `${path}/${id}`, method: 'GET' });

export const httpGetVehiclesByCustomerId = async (id: number) => await httpRequest({ path: `${path}/customer/${id}`, method: 'GET' });
