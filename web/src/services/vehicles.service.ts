import { httpRequest } from '@/utilities';

const path = '/vehicles';

export const httpGetVehiclesPagination = async (data: any) => await httpRequest({ path: `${path}/pagination`, method: 'POST', data });
