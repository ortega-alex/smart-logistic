import { httpRequest } from '@/utilities';

const path = '/profile';

export const httpGetProfiles = async () =>
    await httpRequest({
        path,
        method: 'GET'
    });
