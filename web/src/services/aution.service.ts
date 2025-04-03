import { Auction } from '@/interfaces';
import { httpRequest } from '@/utilities';

const path = '/aution';

export const httpGetAllAuctions = async () =>
    await httpRequest({
        path,
        method: 'GET'
    });

export const httpAddAuctions = async (data: Auction) =>
    await httpRequest({
        path,
        method: 'POST',
        data
    });

export const httpUpdateAuctions = async (data: Auction) =>
    await httpRequest({
        path: `${path}/${data.id}`,
        method: 'PUT',
        data
    });
