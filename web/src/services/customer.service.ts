import { Customer, OnlyEmail } from '@/interfaces';
import { httpRequest } from '@/utilities';

const path = '/customer';

export const httpAddCustomer = async (data: Customer) =>
    await httpRequest({
        path,
        method: 'POST',
        data,
        type: 'multipart'
    });

export const httpGetCustomer = async () =>
    await httpRequest({
        path,
        method: 'GET'
    });

export const httpGetCustomerById = async (id: number) =>
    await httpRequest({
        path: `${path}/${id}`,
        method: 'GET'
    });

export const httpEditCustomer = async (data: Customer) =>
    await httpRequest({
        path: `${path}/${data.id}`,
        method: 'PUT',
        data,
        type: 'multipart'
    });

export const httpGetCustomerPaginationData = async (data: any) =>
    await httpRequest({
        path: `${path}/pagination`,
        method: 'POST',
        data
    });

export const httpCustomerLogin = async (data: OnlyEmail) =>
    await httpRequest({
        path: `${path}/login`,
        method: 'POST',
        data
    });
