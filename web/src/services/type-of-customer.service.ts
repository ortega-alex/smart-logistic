import { TypeOfCustomer } from '@/models';
import { httpRequest } from '@/utilities';

const path = '/type-of-customer';

export const httpGetTypeOfCustomer = async () =>
    await httpRequest({
        path,
        method: 'GET'
    });

export const httpAddTypeOfCustomer = async (data: TypeOfCustomer) =>
    await httpRequest({
        path,
        method: 'POST',
        data
    });

export const httpEditTypeOfCustomer = async (data: TypeOfCustomer) =>
    await httpRequest({
        path: `${path}/${data.id_tipo_cliente}`,
        method: 'PUT',
        data
    });
