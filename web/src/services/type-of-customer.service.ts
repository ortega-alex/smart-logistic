import { httpRequest } from '@/utilities';

const path = '/type-of-customer';

export const httpGetTypeOfCustomer = async () =>
    await httpRequest({
        path,
        method: 'GET'
    });
