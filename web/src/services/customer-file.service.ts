import { httpRequest } from '@/utilities';

const path = '/customer-file';

export const httpDeleteCustomerFile = async (id: number) =>
    await httpRequest({
        path: `${path}/${id}`,
        method: 'DELETE'
    });
