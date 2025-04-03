import { httpRequest } from '@/utilities';

const path = '/state';

export const httpGetAllStates = async () =>
    await httpRequest({
        path,
        method: 'GET'
    });
