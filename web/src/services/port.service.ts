import { Port } from '@/models';
import { httpRequest } from '@/utilities';

const path = '/port';

export const httpGetPorts = async () =>
    await httpRequest({
        path,
        method: 'GET'
    });

export const httpAddPort = async (data: Port) =>
    await httpRequest({
        path,
        method: 'POST',
        data
    });

export const httpUpdatePort = async (data: Port) =>
    await httpRequest({
        path: `${path}/${data.id_puerto}`,
        method: 'PUT',
        data
    });
