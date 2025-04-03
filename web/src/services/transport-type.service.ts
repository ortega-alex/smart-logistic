import { httpRequest } from '@/utilities';

const path = '/transport-type';

export const httpGetAllTransportTypes = async () =>
    await httpRequest({
        path,
        method: 'GET'
    });
