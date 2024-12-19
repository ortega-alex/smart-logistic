import { Crane } from '@/models';
import { httpRequest } from '@/utilities';

const path = '/crane';

export const httpGetCrane = async () =>
    await httpRequest({
        path,
        method: 'GET'
    });

export const httpAddCrane = async (data: Crane) =>
    await httpRequest({
        path,
        data,
        method: 'POST'
    });

export const httpUpdateCrane = async (data: Crane) =>
    await httpRequest({
        path: `${path}/${data.id_grua}`,
        data,
        method: 'PUT'
    });
