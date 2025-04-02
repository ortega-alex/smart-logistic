import { CustomerType } from '@/interfaces';
import { httpRequest } from '@/utilities';

const path = '/customer-type';

export const httpGetCustomerType = async () =>
    await httpRequest({
        path,
        method: 'GET'
    });

export const httpAddCustomerType = async (data: CustomerType) =>
    await httpRequest({
        path,
        method: 'POST',
        data
    });

export const httpEditCustomerType = async (data: CustomerType) =>
    await httpRequest({
        path: `${path}/${data.id}`,
        method: 'PUT',
        data
    });
