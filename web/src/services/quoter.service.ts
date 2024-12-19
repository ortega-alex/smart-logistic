import { httpRequest } from '@/utilities';

const path = '/quoter';

export const httpGetQuoters = async () => await httpRequest({ path, method: 'GET' });

export const httpGetQuotersById = async (id: number) => await httpRequest({ path: `${path}/${id}`, method: 'GET' });

export const httpAddQuoter = async (quoter: any) => await httpRequest({ path, method: 'POST', data: quoter });

export const httpUpdateQuoter = async (quoter: any) =>
    await httpRequest({ path: `${path}/${quoter.id_cotizacion}`, method: 'PUT', data: quoter });

export const httpDowloadInvoice = async (id: number) =>
    await httpRequest({ path: `${path}/invoice/${id}`, method: 'GET', responseType: 'blob' });

export const httpGetQuoterPaginationData = async (data: any) =>
    await httpRequest({
        path: `${path}/pagination`,
        method: 'POST',
        data
    });
