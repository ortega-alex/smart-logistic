import { TransportRate, TransportRateFilter } from '@/interfaces';
import { httpRequest } from '@/utilities';

const path = '/transport-rate';

export const httpGetTransportRateFiler = async (body: TransportRateFilter) =>
    await httpRequest({
        path: `${path}/get-rate`,
        method: 'POST',
        data: body
    });

export const httpGetAllTransportRates = async () =>
    await httpRequest({
        path,
        method: 'GET'
    });

export const httpGetTransportRateById = async (id: string) =>
    await httpRequest({
        path: `${path}/${id}`,
        method: 'GET'
    });

export const httpAddTransportRate = async (transportRate: TransportRate) =>
    await httpRequest({
        path,
        method: 'POST',
        data: transportRate
    });

export const httpEditTransportRate = async (transportRate: TransportRate) =>
    await httpRequest({
        path: `${path}/${transportRate.id}`,
        method: 'PUT',
        data: transportRate
    });
