import { Aution } from '@/models';
import { httpRequest } from '@/utilities';

const path = '/aution';

export const httpGetAutions = async () =>
    await httpRequest({
        path,
        method: 'GET'
    });

export const httpAddAutions = async (data: Aution) =>
    await httpRequest({
        path,
        method: 'POST',
        data
    });

export const httpUpdateAutions = async (data: Aution) =>
    await httpRequest({
        path: `${path}/${data.id_subasta}`,
        method: 'PUT',
        data
    });
